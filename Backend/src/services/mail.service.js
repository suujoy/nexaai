import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID,
    },
});

transporter
    .verify()
    .then(() => {
        console.log("Email Transporter is ready to sent emails");
    })
    .catch((err) => {
        console.log("Email Transporter verification failed ", err);
    });

export const sendEmail = async ({ to, subject, html, text }) => {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text,
    };
    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent", details);
};
