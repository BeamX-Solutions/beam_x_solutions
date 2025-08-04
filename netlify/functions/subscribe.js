const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryOnRateLimit = async (fn, retries = 3, baseDelay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const startTime = Date.now();
      const result = await fn();
      console.log(`API call completed in ${Date.now() - startTime}ms`);
      return result;
    } catch (error) {
      if (error.statusCode === 429 && i < retries - 1) {
        const delayMs = baseDelay * Math.pow(2, i);
        console.log(`Rate limit hit, retrying after ${delayMs}ms...`);
        await delay(delayMs);
        continue;
      }
      throw error;
    }
  }
};

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const { firstName, lastName, email, action } = JSON.parse(event.body);

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid email address' }),
    };
  }

  try {
    if (action === 'unsubscribe') {
      // Handle unsubscribe
      const { data: contactList } = await retryOnRateLimit(() =>
        resend.contacts.list({
          audienceId: process.env.RESEND_AUDIENCE_ID,
        })
      );
      const existingContact = contactList.data.find((c) => c.email === email);

      if (!existingContact) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Email not found in audience' }),
        };
      }

      const audienceResponse = await retryOnRateLimit(() =>
        resend.contacts.update({
          audienceId: process.env.RESEND_AUDIENCE_ID,
          id: existingContact.id,
          unsubscribed: true,
        })
      );

      console.log('Audience response:', audienceResponse);
      if (!audienceResponse.data) {
        throw new Error(`Failed to unsubscribe: ${JSON.stringify(audienceResponse.error)}`);
      }

      await delay(1000);

      const emailResponse = await retryOnRateLimit(() =>
        resend.emails.send({
          from: 'BeamX Solutions Team <info@beamxsolutions.com>',
          to: email,
          subject: 'You’ve Unsubscribed from BeamX Solutions Newsletter',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <img src="https://beamxsolutions.com/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; display: block; margin: 0 auto 20px;">
              <h1 style="color: #333; text-align: center;">We're Sorry to See You Go, ${firstName} ${lastName}</h1>
              <p style="color: #555; line-height: 1.6;">You have successfully unsubscribed. <a href="https://beamxsolutions.com/subscribe" style="color: #0066cc;">Resubscribe here</a>.</p>
            </div>
          `,
        })
      );

      console.log('Email response:', emailResponse);
      if (!emailResponse.data) {
        throw new Error(`Failed to send unsubscribe email: ${JSON.stringify(emailResponse.error)}`);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Unsubscribed successfully! Check your email.' }),
      };
    }

    // Handle subscribe (send confirmation email)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { error: dbError } = await supabase.from('pending_subscriptions').insert([
      {
        email,
        first_name: firstName,
        last_name: lastName,
        token,
        expires_at: expiresAt,
      },
    ]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      throw new Error('Failed to store pending subscription');
    }

    const confirmationUrl = `https://${event.headers.host}/.netlify/functions/confirm-subscription?token=${token}&email=${encodeURIComponent(email)}`;
    const emailResponse = await retryOnRateLimit(() =>
      resend.emails.send({
        from: 'BeamX Solutions Team <info@beamxsolutions.com>',
        to: email,
        subject: 'Confirm Your Subscription to BeamX Solutions Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <img src="https://beamxsolutions.com/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; display: block; margin: 0 auto 20px;">
            <h1 style="color: #333; text-align: center;">Confirm Your Subscription</h1>
            <p style="color: #555; line-height: 1.6;">Hello ${firstName} ${lastName},</p>
            <p style="color: #555; line-height: 1.6;">Thank you for signing up for the BeamX Solutions newsletter! Please confirm your subscription by clicking the button below.</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="display: inline-block; background-color: #0066cc; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Confirm Subscription</a>
            </p>
            <p style="color: #555; line-height: 1.6;">This link will expire in 24 hours. If you did not request this subscription, you can ignore this email.</p>
          </div>
        `,
      })
    );

    console.log('Email response:', emailResponse);
    if (!emailResponse.data) {
      throw new Error(`Failed to send confirmation email: ${JSON.stringify(emailResponse.error)}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Confirmation email sent! Please check your email.' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not process request. ${error.message}` }),
    };
  }
};