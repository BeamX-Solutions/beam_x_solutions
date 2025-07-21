const { Resend } = require('resend');
const crypto = require('crypto');

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email } = JSON.parse(event.body);

  try {
    // Generate a unique confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    // Add to audience with unsubscribed: true and token as a tag
    const audienceResponse = await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      email,
      firstName,
      lastName,
      unsubscribed: true,
      tags: [{ name: 'confirmationToken', value: confirmationToken }],
    });

    if (!audienceResponse.data) {
      throw new Error('Failed to add contact to audience');
    }

    // Create confirmation link
    const confirmationLink = `${process.env.SITE_URL}/api/confirm-subscription?email=${encodeURIComponent(
      email
    )}&token=${confirmationToken}`;

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: 'info@beamxsolutions.com',
      to: email,
      subject: 'Confirm Your BeamX Solutions Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="https://beamxsolutions.com/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h1 style="color: #333; text-align: center;">Welcome, ${firstName} ${lastName}!</h1>
          <p style="color: #555; line-height: 1.6;">Thank you for subscribing to the BeamX Solutions newsletter! Please confirm your subscription by clicking the button below.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${confirmationLink}" style="display: inline-block; background-color: #0066cc; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Confirm Subscription</a>
          </p>
          <p style="color: #555; line-height: 1.6;">If you did not request this subscription, please ignore this email.</p>
          <p style="color: #888; font-size: 12px; text-align: center; margin-top: 20px;">
            BeamX Solutions | Springfield Ave, Chicago, IL 60625 | © 2025 BeamX Solutions
          </p>
        </div>
      `,
    });

    if (!emailResponse.data) {
      throw new Error('Failed to send confirmation email');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Please check your email to confirm your subscription.' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not process subscription. ${error.message}` }),
    };
  }
};