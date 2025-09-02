import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

interface MailOptions {
	to: string;
	subject: string;
	text: string;
	html?: string;
}

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
} as SMTPTransport.Options);

export async function sendMail(options: MailOptions) {
	const mailOptions = {
		from: process.env.SMTP_FROM, // sender address
		to: options.to, // list of receivers
		subject: options.subject, // Subject line
		text: options.text, // plain text body
		html: options.html, // html body
	};
	await transporter.sendMail(mailOptions);
	console.log("Message sent: %s", options.to);
	return true;
}
