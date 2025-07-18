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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="public/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h1 style="color: #333; text-align: center;">Welcome, ${firstName} ${lastName}!</h1>
          <p style="color: #555; line-height: 1.6;">Thank you for joining the BeamX Solutions community! We're thrilled to have you on board. Our newsletter will keep you updated with the latest insights, trends, and innovations in data analytics, artificial intelligence, and digital transformation.</p>
          <p style="color: #555; line-height: 1.6;">Here's what you can expect:</p>
          <ul style="color: #555; line-height: 1.6;">
            <li>Exclusive industry updates and expert tips</li>
            <li>Case studies showcasing real-world AI and analytics solutions</li>
            <li>Invitations to webinars and events hosted by BeamX Solutions</li>
          </ul>
          <p style="color: #555; line-height: 1.6;">Stay tuned for our next edition, where we'll dive into cutting-edge strategies to empower your business. If you have any questions or topics you'd like us to cover, feel free to reply to this email!</p>
          <p style="color: #555; text-align: center; margin-top: 30px;">
            <a href="https://beamxsolutions.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #0066cc; text-decoration: none;">Unsubscribe</a>
          </p>
          <p style="color: #888; font-size: 12px; text-align: center; margin-top: 20px;">
            BeamX Solutions | 123 Innovation Drive, Tech City | &copy; 2025 BeamX Solutions
          </p>
        </div>
      `,
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