const WelcomeEmailTemplate = (username = "Player") => `
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

                            <p style="margin: 0 0 18px; color: #e5e7eb; font-size: 17px; line-height: 1.8;">
                                Hey <strong>${username}</strong>,
                            </p>

                            <p style="margin: 0 0 18px; color: #cbd5f5; font-size: 16px; line-height: 1.8;">
                                You’re officially in the arena! 🏟️  
                                Power11 is where strategy meets skill. Create your dream team, compete in high-energy contests, and rise to the top of the leaderboard.
                            </p>

                            <p style="margin: 26px 0 14px; color: #ffffff; font-size: 18px; font-weight: 700;">
                                What you can do in Power11 💪
                            </p>

                            <ul style="margin: 0 0 24px; padding-left: 20px;">
                                <li style="color: #cbd5f5; margin-bottom: 12px; font-size: 16px;">
                                    ⚔️ Create your ultimate fantasy team
                                </li>
                                <li style="color: #cbd5f5; margin-bottom: 12px; font-size: 16px;">
                                    🧠 Use strategy to outplay opponents
                                </li>
                                <li style="color: #cbd5f5; margin-bottom: 12px; font-size: 16px;">
                                    🏆 Compete in daily & mega contests
                                </li>
                                <li style="color: #cbd5f5; margin-bottom: 12px; font-size: 16px;">
                                    💰 Win exciting rewards & bragging rights
                                </li>
                                <li style="color: #cbd5f5; margin-bottom: 12px; font-size: 16px;">
                                    🔒 100% secure & fair gameplay
                                </li>
                            </ul>

                            <!-- CTA -->
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #ef4444, #f59e0b); color: #ffffff; padding: 16px 44px; text-decoration: none; border-radius: 10px; font-size: 16px; font-weight: 700; box-shadow: 0 8px 20px rgba(239,68,68,0.4);">
                                    Enter the Arena ⚡
                                </a>
                            </div>

                            <p style="margin: 20px 0 0; color: #cbd5f5; font-size: 16px;">
                                Let the games begin 🚀  
                            </p>

                            <p style="margin: 8px 0 0; color: #ffffff; font-size: 16px; font-weight: 700;">
                                — Team Power11
                            </p>
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

module.exports = WelcomeEmailTemplate;
