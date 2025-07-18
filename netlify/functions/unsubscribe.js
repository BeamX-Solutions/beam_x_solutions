const { Resend } = require('resend');

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email } = event.queryStringParameters;

  try {
    // Update contact to unsubscribed
    const contacts = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    const contact = contacts.data.data.find((c) => c.email === email);
    if (!contact) {
      throw new Error('Contact not found');
    }

    await resend.contacts.update({
      audienceId: process.env.RESEND_AUDIENCE_ID,
      id: contact.id,
      unsubscribed: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Unsubscribed successfully.' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not unsubscribe. ${error.message}` }),
    };
  }
};