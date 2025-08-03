const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

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
  const { token, email } = event.queryStringParameters;

  if (!token || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing token or email' }),
    };
  }

  try {
    // Verify token in Supabase
    const { data: pendingSubscription, error: dbError } = await supabase
      .from('pending_subscriptions')
      .select('*')
      .eq('email', email)
      .eq('token', token)
      .single();

    if (dbError || !pendingSubscription) {
      console.error('Supabase query error:', dbError);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid or expired confirmation link' }),
      };
    }

    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(pendingSubscription.expires_at);
    if (now > expiresAt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Confirmation link has expired' }),
      };
    }

    // Add to Resend audience
    const audienceResponse = await retryOnRateLimit(() =>
      resend.contacts.create({
        audienceId: process.env.RESEND_AUDIENCE_ID,
        email: pendingSubscription.email,
        firstName: pendingSubscription.first_name,
        lastName: pendingSubscription.last_name,
        unsubscribed: false,
      })
    );

    console.log('Audience response:', audienceResponse);
    if (!audienceResponse.data) {
      throw new Error(`Failed to add contact: ${JSON.stringify(audienceResponse.error)}`);
    }

    // Wait to avoid rate limit
    await delay(1000);

    // Send welcome email
    const emailResponse = await retryOnRateLimit(() =>
      resend.emails.send({
        from: 'BeamX Solutions Team <info@beamxsolutions.com>',
        to: pendingSubscription.email,
        subject: 'Welcome to BeamX Solutions Newsletter!',
        headers: {
          'List-Unsubscribe': `<mailto:unsubscribe-${audienceResponse.data.id}@beamxsolutions.com?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <img src="https://beamxsolutions.com/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; display: block; margin: 0 auto 20px;">
            <h1 style="color: #333; text-align: center;">Welcome, ${pendingSubscription.first_name} ${pendingSubscription.last_name}!</h1>
            <p style="color: #555; line-height: 1.6;">Thank you for joining the BeamX Solutions community! We're thrilled to have you on board. Our newsletter will keep you updated with the latest insights, trends, and innovations in data analytics, artificial intelligence, and digital transformation.</p>
            <p style="color: #555; line-height: 1.6;">Here's what you can expect:</p>
            <ul style="color: #555; line-height: 1.6;">
                <li>Exclusive industry updates and expert tips</li>
                <li>Case studies showcasing real-world AI and analytics solutions</li>
                <li>Invitations to webinars and events hosted by BeamX Solutions</li>
            </ul>
            <p style="color: #555; line-height: 1.6;">Stay tuned for our next edition, where we'll dive into cutting-edge strategies to empower your business. If you have any questions or topics you'd like us to cover, feel free to reply to this email!</p>
            <p style="color: #555; text-align: center; margin-top: 30px;">
              <a href="mailto:unsubscribe-${audienceResponse.data.id}@beamxsolutions.com?subject=unsubscribe" style="display: inline-block; background-color: #0066cc; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Unsubscribe</a>
            </p>
          </div>
          
        `,
      })
    );

    console.log('Email response:', emailResponse);
    if (!emailResponse.data) {
      throw new Error(`Failed to send welcome email: ${JSON.stringify(emailResponse.error)}`);
    }

    // Delete pending subscription
    await supabase.from('pending_subscriptions').delete().eq('id', pendingSubscription.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription confirmed! Welcome aboard.' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not confirm subscription. ${error.message}` }),
    };
  }
};