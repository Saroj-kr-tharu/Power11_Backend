const generatePaymentEmail = (data) => {
    const {
        userEmail,
        notificationTime,
        transitionId,
        amount,
        gateway,
        payment_status,
        currency
    } = data;

    // Format date nicely
    const formattedDate = new Date(notificationTime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Format amount with currency symbol
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);

    // Status badge color based on payment_status
    const getStatusColor = (status) => {
        switch (status) {
            case 'SUCCESS': return '#14b8a6';
            case 'FAILED': return '#ef4444';
            case 'PENDING': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    // Email HTML template using teal theme
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MarketMandu Payment Notification</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f0fdfa;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
          <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 40px 30px; text-align: center;">
          
            <h1 style="color: white; margin: 0; font-weight: 600; font-size: 24px;">MarketMandu Payment Confirmation</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 18px; font-weight: 600; color: #0f766e; margin-bottom: 16px; letter-spacing: -0.025em;">Hello ${userEmail.split('@')[0]},</p>
            <p style="margin-bottom: 20px; color: #334155;">Thank you for your order! We've successfully processed your payment.</p>
            
            <div style="font-size: 36px; font-weight: 700; text-align: center; margin: 30px 0; color: #0f766e;">${formattedAmount}</div>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; color: white; background-color: ${getStatusColor(payment_status)}; text-transform: uppercase; letter-spacing: 0.5px;">
                ${payment_status}
              </span>
            </div>
            
            <div style="background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border-radius: 8px; padding: 24px; margin: 20px 0; border-left: 4px solid #14b8a6;">
              
              <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 14px;">
                <span style="color: #0f766e; font-weight: 600; margin-right: 20px;">Transaction ID</span>
                <span style="color: #134e4a; font-weight: 600; text-align: right;">${transitionId}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 14px;">
                <span style="color: #0f766e; font-weight: 600; margin-right: 20px;">Date & Time</span>
                <span style="color: #134e4a; font-weight: 600; text-align: right;">${formattedDate}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 14px;">
                <span style="color: #0f766e; font-weight: 600; margin-right: 20px;">Payment Method</span>
                <span style="color: #134e4a; font-weight: 600; text-align: right;">${gateway}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 14px;">
                <span style="color: #0f766e; font-weight: 600; margin-right: 20px;">Payment Status</span>
                <span style="color: #134e4a; font-weight: 600; text-align: right;">${payment_status}</span>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 14px;">
                <span style="color: #0f766e; font-weight: 600; margin-right: 20px;">Email</span>
                <span style="color: #134e4a; font-weight: 600; text-align: right;">${userEmail}</span>
              </div>
            </div>
            
            <div style="background-color: #f0fdfa; border-radius: 8px; padding: 16px; margin-top: 24px; border: 1px solid #99f6e4;">
              <p style="margin: 0; font-size: 14px; color: #0f766e; text-align: center;">
                <strong>Need help?</strong> Contact our support team at <a href="mailto:support@marketmandu.com" style="color: #14b8a6; text-decoration: none; font-weight: 600;">support@marketmandu.com</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 24px 30px; border-top: 2px solid #ccfbf1; background-color: #f0fdfa; font-size: 12px; color: #0f766e;">
            <p style="margin: 5px 0; font-weight: 600;">© 2025 MarketMandu. All rights reserved.</p>
            <p style="margin: 5px 0;">Your trusted online marketplace</p>
            <p style="margin: 10px 0 5px 0;">
              <a href="#" style="color: #14b8a6; text-decoration: none; margin: 0 8px;">Privacy Policy</a> | 
              <a href="#" style="color: #14b8a6; text-decoration: none; margin: 0 8px;">Terms of Service</a> | 
              <a href="#" style="color: #14b8a6; text-decoration: none; margin: 0 8px;">Contact Us</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    return htmlContent;

};

module.exports = generatePaymentEmail;