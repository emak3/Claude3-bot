const nodemailer = require('nodemailer');
const { getConfig } = require('./config.js');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: getConfig().EMAIL_USER,
        pass: getConfig().EMAIL_PASS,
    },
});



async function sendVerificationEmail(to, code) {
    const sendHTML = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>めしぃサーバー</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: 40px auto; padding: 30px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #2c3e50; text-align: center;">ようこそ！</h2>
    <p style="font-size: 16px; color: #333333; text-align: center;">
      あなたの認証コードは
    </p>
    <p style="font-size: 24px; font-weight: bold; color: #3498db; text-align: center; margin: 16px 0;">
      ${code}
    </p>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
    <p style="font-size: 14px; color: #888888; text-align: center;">
      このメールに心当たりがない場合は破棄してください。
    </p>
  </div>
</body>
</html>
`;
    const mailOptions = {
        from: `"Verify Bot" <${getConfig().EMAIL_USER}>`,
        to,
        subject: 'メール認証',
        text: 'No reply',
        html: sendHTML,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
