const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const response = await fetch('https://beamx-scorecard.onrender.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to wake scorecard backend: Status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `Failed to wake scorecard backend: Status ${response.status}` }),
      };
    }

    console.log('Scorecard backend wake-up successful');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Scorecard backend wake-up successful' }),
    };
  } catch (error) {
    console.error('Error waking scorecard backend:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error waking scorecard backend', error: error.message }),
    };
  }
};