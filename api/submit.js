import nodemailer from 'nodemailer';


export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).end();


const { name, email, company, message } = req.body;


// EMAIL
const transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});


await transporter.sendMail({
from: 'FenxAI <leads@fenxai.com>',
to: 'you@fenxai.com',
subject: 'New FenxAI Lead',
html: `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Company:</b> ${company}<br/><b>Message:</b> ${message}`,
});


console.log({ name, email, company, message });


res.status(200).json({ success: true });
}
