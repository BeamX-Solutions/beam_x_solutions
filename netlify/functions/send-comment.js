const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, website, comment, postTitle, postSlug } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !comment || !postTitle || !postSlug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"BeamX Solutions Comments" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Comment on "${postTitle}"`,
      text: `
        New comment received on blog post: ${postTitle}
        URL: https://beamxsolutions.com/blog/${postSlug}

        Name: ${name}
        Email: ${email}
        Website: ${website || 'N/A'}
        Comment: ${comment}
      `,
      html: `
        <h2>New Comment on "${postTitle}"</h2>
        <p><strong>Post URL:</strong> <a href="https://beamxsolutions.com/blog/${postSlug}">View Post</a></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website || 'N/A'}</p>
        <p><strong>Comment:</strong></p>
        <p>${comment.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Comment submitted successfully' }),
    };
  } catch (error) {
    console.error('Error sending comment email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send comment' }),
    };
  }
};