const { Resend } = require('resend');

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email, token } = event.queryStringParameters;

  try {
    // Fetch contact from audience
    const contactsResponse = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    const subscriber = contactsResponse.data.data.find(
      (contact) => contact.email === email && contact.tags.some((tag) => tag.name === 'confirmationToken' && tag.value === token)
    );

    if (!subscriber) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid or expired confirmation link.' }),
      };
    }

    // Update subscriber to subscribed status and remove confirmation token
    const updateResponse = await resend.contacts.update({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      id: subscriber.id,
      unsubscribed: false,
      tags: subscriber.tags.filter((tag) => tag.name !== 'confirmationToken'),
    });

    if (!updateResponse.data) {
      throw new Error('Failed to update subscriber status');
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: 'info@beamxsolutions.com',
      to: subscriber.email,
      subject: 'Welcome to BeamX Solutions Newsletter!',
      headers: {
        'List-Unsubscribe': `<mailto:unsubscribe-${subscriber.id}@beamxsolutions.com?subject=unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="https://beamxsolutions.com/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h1 style="color: #333; text-align: center;">Welcome, ${subscriber.firstName} ${subscriber.lastName}!</h1>
          <p style="color: #555; line-height: 1.6;">Thank you for joining the BeamX Solutions community! We're thrilled to have you on board. Our newsletter will keep you updated with the latest insights, trends, and innovations in data analytics, artificial intelligence, and digital transformation.</p>
          <p style="color: #555; line-height: 1.6;">Here's what you can expect:</p>
          <ul style="color: #555; line-height: 1.6;">
            <li>Exclusive industry updates and expert tips</li>
            <li>Case studies showcasing real-world AI and analytics solutions</li>
            <li>Invitations to webinars and events hosted by BeamX Solutions</li>
          </ul>
          <p style="color: #555; line-height: 1.6;">Stay tuned for our next edition, where we'll dive into cutting-edge strategies to empower your business. If you have any questions or topics you'd like us to cover, feel free to reply to this email!</p>
          <p style="color: #555; text-align: center; margin-top: 30px;">
            <a href="mailto:unsubscribe-${subscriber.id}@beamxsolutions.com?subject=unsubscribe" style="display: inline-block; background-color: #0066cc; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Unsubscribe</a>
          </p>
          <p style="color: #888; font-size: 12px; text-align: center; margin-top: 20px;">
            BeamX Solutions | Springfield Ave, Chicago, IL 60625 | © 2025 BeamX Solutions
          </p>
        </div>
      `,
    });

    if (!emailResponse.data) {
      throw new Error('Failed to send welcome email');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <html>
          <head>
            <title>Subscription Confirmed</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              h1 { color: #333; }
              p { color: #555; }
              a { color: #0066cc; text-decoration: none; }
            </style>
          </head>
          <body>
            <img src="https://beamxsolutions.com/Beamx-Logo-Colour3.jpg" alt="BeamX Solutions Logo" style="max-width: 200px; margin-bottom: 20px;">
            <h1>Subscription Confirmed!</h1>
            <p>Thank you for confirming your subscription to the BeamX Solutions newsletter.</p>
            <p><a href="${process.env.SITE_URL}">Return to our website</a></p>
          </body>
        </html>
      `,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not confirm subscription. ${error.message}` }),
    };
  }
};