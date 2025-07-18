const { Resend } = require('resend');

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email } = JSON.parse(event.body);

  try {
    // Add subscriber to Resend Audience
    const audienceResponse = await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      email,
      firstName,
      lastName,
      unsubscribed: false,
    });

    if (!audienceResponse.data) {
      throw new Error('Failed to add contact to audience');
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: 'chimaobi@beamxsolutions.com',
      to: email,
      subject: 'Welcome to BeamX Solutions Newsletter!',
      html: `<h1>Welcome, ${firstName} ${lastName}!</h1><p>Thank you for subscribing to our newsletter. You'll receive the latest insights on data analytics, AI, and digital transformation.</p><p><a href="https://beamxsolutions.com/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>`,
    });

    if (!emailResponse.data) {
      throw new Error('Failed to send confirmation email');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription successful! Check your email.' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not subscribe. ${error.message}` }),
    };
  }
};