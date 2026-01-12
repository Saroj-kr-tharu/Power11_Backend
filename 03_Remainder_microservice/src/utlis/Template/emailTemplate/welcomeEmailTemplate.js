const WelcomeEmailTemplate = (data = {}) => {
    const { username = "Player", body = "", app_url = "#" } = data;
    
    // Replace {{username}} placeholder in body
    const processedBody = body.replace(/\{\{username\}\}/g, username);
    
    // Convert plain text to HTML with proper formatting
    const formattedBody = processedBody
        .split('\n')
        .map(line => {
            line = line.trim();
            if (!line) return '<br/>';
            if (line.startsWith('- ')) {
                return `<div style="margin-left: 20px; margin-bottom: 8px;">• ${line.substring(2)}</div>`;
            }
            if (line.startsWith('—')) {
                return `<p style="margin: 20px 0 0; font-weight: 700;">${line}</p>`;
            }
            if (line.includes('Need help?')) {
                return `<p style="margin: 8px 0 0; color: #94a3b8;">${line}</p>`;
            }
            if (line.includes('What you can do')) {
                return `<p style="margin: 26px 0 14px; color: #ffffff; font-weight: 700;">${line}</p>`;
            }
            if (line.startsWith('Hey ')) {
                return `<p style="margin: 0 0 18px; color: #e5e7eb; font-size: 17px;">${line}</p>`;
            }
            if (line.includes('Let the games')) {
                return `<p style="margin: 20px 0 0;">${line}</p>`;
            }
            return `<p style="margin: 0 0 18px;">${line}</p>`;
        })
        .join('');
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Power11</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #0b1020;">
    <!-- Email Container -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0b1020; font-family: 'Poppins', Arial, sans-serif;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%); padding: 40px 0; text-align: center; border-radius: 18px 18px 0 0;">
                            <div style="background: rgba(0,0,0,0.25); padding: 24px; margin: 0 auto; width: fit-content; border-radius: 14px;">
                                <div style="font-size: 52px; margin-bottom: 8px;">⚡</div>
                                <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 800; letter-spacing: 1px;">
                                    Power11
                                </h1>
                                <p style="margin: 6px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                    Build • Battle • Win
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 30px; text-align: center; font-weight: 800;">
                                Welcome to Power11, ${username}! 🔥
                            </h2>

                            <div style="color: #cbd5f5; font-size: 16px; line-height: 1.8;">
                                ${formattedBody}
                            </div>

                            <!-- CTA -->
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="${app_url}" style="display: inline-block; background: linear-gradient(135deg, #ef4444, #f59e0b); color: #ffffff; padding: 16px 44px; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 700; box-shadow: 0 8px 20px rgba(239,68,68,0.4);">
                                    Enter the Arena ⚡
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 26px; background-color: #020617; border-radius: 0 0 18px 18px; text-align: center;">
                            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 13px;">
                                Need help? Reach us at 
                                <a href="mailto:support@power11.com" style="color: #f59e0b; text-decoration: none;">
                                    support@power11.com
                                </a>
                            </p>
                            <p style="margin: 0; color: #64748b; font-size: 12px;">
                                © 2025 Power11. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

module.exports = WelcomeEmailTemplate;