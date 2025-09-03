import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

interface MailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GOOGLE_SMTP_USER,
		pass: process.env.GOOGLE_SMTP_PASS,
	},
} as SMTPTransport.Options);

export async function sendMail(options: MailOptions) {
	const mailOptions = {
		from: process.env.GOOGLE_SMTP_USER,
		to: options.to,
		subject: options.subject,
		text: options.text,
		html: options.html,
	};
	return transporter.sendMail(mailOptions, (error) => {
		if (error) {
			console.error("Error sending email:", error);
			return false;
		}
		return true;
	});
}

async function mailer(type: string, options: MailOptions) {
	switch (type) {
		case "register":
			return sendMail(options);
		case "login":
			return sendMail(options);
		case "forgot-password":
			return sendMail(options);
		default:
			throw new Error("Invalid mailer type");
	}
}

export default mailer;
