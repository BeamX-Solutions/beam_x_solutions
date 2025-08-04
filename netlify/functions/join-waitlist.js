const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

exports.handler = async function (event, context) {
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

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error: dbError } = await supabase
      .from('marketing_waitlist')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving to database' }),
      };
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: 'BeamX Solutions Team <info@beamxsolutions.com>',
      to: email,
      subject: 'Welcome to the AI Marketing Plan Generator Waitlist',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">You're on the Waitlist!</h1>
          <p style="color: #555; line-height: 1.6;">Hello ${firstName} ${lastName}, thank you for joining the waitlist for our AI Marketing Plan Generator. We'll notify you when it launches.</p>
        </div>
      `,
    });

    if (!emailResponse.data) {
      console.error('Email error:', emailResponse.error);
      // Optionally, proceed even if email fails, or handle as needed
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