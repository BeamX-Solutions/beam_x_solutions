const { Resend } = require('resend');

exports.handler = async (event) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email, audienceId } = event.queryStringParameters;

  try {
    const { data } = await resend.contacts.list({ audienceId });
    const contact = data.data.find((c) => c.email === email);

    return {
      statusCode: 200,
      body: JSON.stringify({
        isSubscribed: contact && !contact.unsubscribed,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error: Could not check subscription status. ${error.message}` }),
    };
  }
};