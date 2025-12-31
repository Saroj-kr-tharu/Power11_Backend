const generateVerificationEmailTemplate = (
    username = "Player",
    verificationLink = "https://example.com/verify"
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Power11</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #020617;">
    <!-- Email Container -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #020617; font-family: 'Poppins', Arial, sans-serif;">
        <tr>
            <td style="padding: 24px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%); padding: 40px 0; text-align: center; border-radius: 18px 18px 0 0;">
                            <div style="background: rgba(0,0,0,0.3); padding: 22px; margin: 0 auto; width: fit-content; border-radius: 14px;">
                                <div style="font-size: 50px; margin-bottom: 8px;">⚡</div>
                                <h1 style="margin: 0; color: #ffffff; font-size: 34px; font-weight: 800; letter-spacing: 1px;">
                                    Power11
                                </h1>
                                <p style="margin: 6px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                    Fantasy • Power • Victory
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Verification Content -->
                    <tr>
                        <td style="padding: 40px 30px 30px;">
                            <h2 style="margin: 0 0 18px; color: #fbbf24; font-size: 28px; text-align: center; font-weight: 800;">
                                Verify Your Email, ${username}! 🔐
                            </h2>

                            <p style="margin: 0 0 18px; color: #cbd5f5; font-size: 16px; line-height: 1.8; text-align: center;">
                                Welcome to <strong>Power11</strong>!  
                                Before entering the arena, please confirm your email address to secure your account.
                            </p>

                            <!-- CTA Button -->
                            <div style="text-align: center; margin: 34px 0;">
                                <a href="${verificationLink}" style="
                                    display: inline-block;
                                    padding: 16px 46px;
                                    background: linear-gradient(135deg, #ef4444, #f59e0b);
                                    color: #ffffff;
                                    text-decoration: none;
                                    font-weight: 700;
                                    border-radius: 12px;
                                    font-size: 16px;
                                    letter-spacing: 0.5px;
                                    box-shadow: 0 8px 22px rgba(239,68,68,0.45);
                                ">
                                    Verify Email ⚡
                                </a>
                            </div>

                            <p style="margin: 26px 0 12px; color: #94a3b8; font-size: 14px; line-height: 1.6; text-align: center;">
                                If the button doesn’t work, copy and paste this link into your browser:
                            </p>

                            <p style="margin: 0; color: #f59e0b; font-size: 14px; text-align: center; word-break: break-word;">
                                <a href="${verificationLink}" style="color: #f59e0b; text-decoration: none;">
                                    ${verificationLink}
                                </a>
                            </p>

                            <p style="margin: 30px 0 0; color: #64748b; font-size: 13px; text-align: center;">
                                This link will expire for security reasons.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 26px; background-color: #020617; border-radius: 0 0 18px 18px; text-align: center;">
                            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 13px;">
                                Need help? Contact us at 
                                <a href="mailto:support@power11.com" style="color: #f59e0b; text-decoration: none;">
                                    support@power11.com
                                </a>
                            </p>
                            <p style="margin: 0; color: #475569; font-size: 12px;">
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

module.exports = generateVerificationEmailTemplate;
