const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const response = await fetch('https://beamx-scorecard.onrender.com/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Treat 404 as success since it still wakes the backend
    console.log(`Scorecard backend pinged, status: ${response.status}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Scorecard backend pinged, status: ${response.status}` }),
    };
  } catch (error) {
    console.error('Error pinging scorecard backend:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error pinging scorecard backend', error: error.message }),
    };
  }
};