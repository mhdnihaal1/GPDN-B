"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class sendOtp {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "nihalmuhaednihal@gmail.com",
                pass: "ixvz kvcj ruqt wjyj",
            },
        });
    }
    sendMail(email, otp) {
        console.log("came here sendmail inside services / sendMail");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "send Email Verification",
            text: `${email},your verification code is: ${otp}`,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err  from send mail  :", err);
            }
            else {
                console.log("verification code sent successfully");
            }
        });
    }
    sendContactMail(name, email, phone, message) {
        console.log("came here sendContactMail inside services");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "New Contact Form Submission",
            text: `You've received a new message from ${name}\n your contact form:\n\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("Error from sendContactMail:", err);
            }
            else {
                console.log("Contact form message sent successfully");
            }
        });
    }
    sendInvitationToUser(email) {
        const link = process.env.InvitationLink;
        console.log("came here sendmail inside services / sendMail");
        const mailOptions = {
            from: "nihalmuhaednihal@gmail.com",
            to: email,
            subject: "You're Invited!",
            html: `<p>Click <a href="${link}">here</a> to accept the invitation.</p>`,
        };
        this.transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("err from send mail  :", err);
            }
            else {
                console.log("invitation Link sent successfully");
            }
        });
    }
}
exports.default = sendOtp;
