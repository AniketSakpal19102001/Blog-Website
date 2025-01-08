import nodemailer from "nodemailer";
export default async (email, otp, subject, htmlContent) => {
  // Create reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testfullstackwebdevelopment@gmail.com", // Your Gmail account
      pass: "tbwa lglu hpub nfqj", // Your Gmail password or App password if 2FA is enabled
    },
  });

  // Email options
  const mailOptions = {
    from: "your-email@gmail.com", // Sender address
    to: email, // Receiver address
    subject: subject, // Subject line (passed as parameter)
    html: htmlContent, // Email body (passed as parameter)
  };

  // Send the email
  return await transporter.sendMail(mailOptions);
};
