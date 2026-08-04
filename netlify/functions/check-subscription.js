const { Resend } = require('resend');

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email } = event.queryStringParameters || {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'A valid email is required' }),
    };
  }

  try {
    const { data } = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    const contact = data.data.find((c) => c.email === email);

    return {
      statusCode: 200,
      body: JSON.stringify({
        isSubscribed: Boolean(contact && !contact.unsubscribed),
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error: Could not check subscription status.' }),
    };
  }
};
