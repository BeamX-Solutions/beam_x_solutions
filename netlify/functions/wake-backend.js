const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const services = [
    'https://loan-approval-api-11n8.onrender.com/',
    'https://beamx-scorecard.onrender.com/',
  ];

  try {
    const fetchPromises = services.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Failed to wake ${url}: Status ${response.status}`);
        }
        console.log(`Backend wake-up successful at ${url} at ${new Date().toISOString()}`);
        return { url, status: response.status, success: true };
      } catch (error) {
        console.error(`Error waking ${url} at ${new Date().toISOString()}:`, error.message);
        return { url, status: null, success: false, error: error.message };
      }
    });

    const results = await Promise.allSettled(fetchPromises);
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
    const failed = results.filter(r => r.status === 'rejected' || !r.value.success);

    if (failed.length > 0) {
      console.log(`Some backends failed at ${new Date().toISOString()}:`, failed);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Some backends failed to wake', results: { successful, failed } }),
      };
    }

    console.log(`All backends woken successfully at ${new Date().toISOString()}:`, successful);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'All backends wake-up successful', results: successful }),
    };
  } catch (error) {
    console.error(`Unexpected error at ${new Date().toISOString()}:`, error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Unexpected error waking backends', error: error.message }),
    };
  }
};