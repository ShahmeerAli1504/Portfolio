export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_name, user_email, subject, message } = req.body || {};

    if (!user_email || !user_email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY || (typeof atob !== 'undefined' ? atob('cmVfSlR2aDNLZExfQ3hBV01CNVNhNTR4NjZaMkFDRENmdTli') : Buffer.from('cmVfSlR2aDNLZExfQ3hBV01CNVNhNTR4NjZaMkFDRENmdTli', 'base64').toString('utf-8'));

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['shahmeerali1504@gmail.com'],
        reply_to: user_email,
        subject: `[Portfolio Inquiry] ${subject || 'New Contact Message'}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; background: #090a0f; color: #f4f4f5; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #22d3ee;">
            <h2 style="color: #22d3ee; margin-top: 0; font-size: 20px;">New Message from Portfolio Website</h2>
            <p style="color: #a1a1aa; font-size: 13px; margin-bottom: 16px;">Transmitted via Portfolio Contact Form</p>
            <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 16px 0;" />
            <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${user_name || 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${user_email}" style="color: #22d3ee;">${user_email}</a></p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <div style="margin-top: 20px; padding: 16px; background: #141722; border-left: 4px solid #22d3ee; border-radius: 6px;">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Message Content:</p>
              <p style="white-space: pre-wrap; margin: 0; color: #ffffff; line-height: 1.6; font-size: 14px;">${message || ''}</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      console.error('Resend API Response Error:', data);
      return res.status(response.status || 500).json({ error: data.message || 'Failed to send email via Resend' });
    }
  } catch (error) {
    console.error('Contact Serverless Handler Error:', error);
    return res.status(500).json({ error: error.message || 'Server error processing request' });
  }
}
