// netlify/functions/whitepaper-gate.js
//
// Captures whitepaper viewer in Resend Audience + sends them the PDF link via email.
//
// Required env vars (add in Netlify > Site settings > Environment variables):
//   RESEND_API_KEY       - your Resend API key (you likely already have this)
//   RESEND_AUDIENCE_ID   - the Audience ID to store contacts in
//   WHITEPAPER_PDF_URL   - public URL of the hosted PDF
//                          e.g. https://www.beamxsolutions.com/BeamX_White_Paper_February_2026.pdf

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const WHITEPAPER_PDF_URL =
  process.env.WHITEPAPER_PDF_URL ||
  "https://www.beamxsolutions.com/BeamX_White_Paper_February_2026.pdf";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method not allowed" }) };
  }

  try {
    const { firstName, lastName, email } = JSON.parse(event.body || "{}");

    if (!firstName || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "First name and email are required." }),
      };
    }

    // ── 1. Add contact to Resend Audience (viewer tracking) ──
    try {
      await fetch(
        `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName || "",
            unsubscribed: false,
          }),
        }
      );
    } catch (contactErr) {
      // Don't block the email send if contact creation fails
      console.error("Resend contact error:", contactErr);
    }

    // ── 2. Send the white paper email ──
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BeamX Solutions <info@beamxsolutions.com>",
        to: [email],
        subject: "Your BeamX White Paper: Blending Instinct with Intelligence",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <img src="https://www.beamxsolutions.com/Beamx-Logo-Colour.png" alt="BeamX Solutions" style="height: 40px; margin-bottom: 24px;" />

            <h2 style="color: #0D2B4E; margin-bottom: 16px;">Hi ${firstName},</h2>

            <p style="color: #333; line-height: 1.7; margin-bottom: 16px;">
              Thank you for your interest in our white paper, <strong>&ldquo;Blending Instinct with Intelligence: How AI-Powered Tools Are Reshaping SME Growth in African Markets.&rdquo;</strong>
            </p>

            <p style="color: #333; line-height: 1.7; margin-bottom: 24px;">
              Click the button below to download your copy:
            </p>

            <a href="${WHITEPAPER_PDF_URL}" style="display: inline-block; background-color: #0066cc; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              Download White Paper (PDF)
            </a>

            <p style="color: #333; line-height: 1.7; margin-top: 24px; margin-bottom: 16px;">
              If you&rsquo;d like to discuss how BeamX can help your business, feel free to
              <a href="https://calendly.com/beamxsolutions/connect" style="color: #0066cc;">schedule a conversation</a>
              with our team.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

            <p style="color: #999; font-size: 12px; line-height: 1.5;">
              BeamX Solutions Ltd<br/>
              97 Adeola Odeku Street, 2nd Floor, Victoria Island, Lagos, Nigeria<br/>
              <a href="https://www.beamxsolutions.com" style="color: #999;">www.beamxsolutions.com</a>
            </p>
          </div>
        `,
        tags: [
          { name: "source", value: "whitepaper-download" },
        ],
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error("Resend email error:", errBody);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Failed to send email. Please try again." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success", email_sent: true }),
    };
  } catch (err) {
    console.error("whitepaper-gate error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};