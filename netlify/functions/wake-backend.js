const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const response = await fetch('https://loan-approval-api-11n8.onrender.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to wake backend: Status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `Failed to wake backend: Status ${response.status}` }),
      };
    }

    console.log('Backend wake-up successful');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Backend wake-up successful' }),
    };
  } catch (error) {
    console.error('Error waking backend:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error waking backend', error: error.message }),
    };
  }
};