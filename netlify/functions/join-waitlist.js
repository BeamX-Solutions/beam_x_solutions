const { createClient } = require('@supabase/supabase-js');

exports.handler = async function (event, context) {
  // Parse the incoming request body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON in request body' }),
    };
  }

  const { firstName, lastName, email } = body;

  // Validate input
  if (!email || !firstName || !lastName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'First name, last name, and email are required' }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid email address' }),
    };
  }

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Insert into marketing_waitlist table
  try {
    const { error } = await supabase
      .from('marketing_waitlist')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving to database' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully joined waitlist' }),
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' }),
    };
  }
};