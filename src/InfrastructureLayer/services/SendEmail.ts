import nodemailer from "nodemailer";
import Nodemailer from "../../UsecaseLayer/Interface/NodeMailer";
import dotenv from "dotenv";
dotenv.config();

class sendOtp implements Nodemailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nihalmuhaednihal@gmail.com",
        pass: "ixvz kvcj ruqt wjyj",
      },
    });
  }
 

  sendMail(email: string, otp: number): void {
    console.log("came here sendmail inside services / sendMail");

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "send Email Verification",
      text: `${email},your verification code is: ${otp}`,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err  from send mail  :", err);
      } else {
        console.log("verification code sent successfully");
      }
    });
  }

  sendContactMail(name:string , email: string, phone: string, message: string): void {
    console.log("came here sendContactMail inside services");
  
    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email, 
      subject: "New Contact Form Submission",
      text: `You've received a new message from ${name}\n your contact form:\n\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };
  
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("Error from sendContactMail:", err);
      } else {
        console.log("Contact form message sent successfully");
      }
    });
  }
  

  sendInvitationToUser(email: string ): void {
    const link = process.env.InvitationLink;
    console.log("came here sendmail inside services / sendMail");

    const mailOptions: nodemailer.SendMailOptions = {
      from: "nihalmuhaednihal@gmail.com",
      to: email,
      subject: "You're Invited!",
      html: `<p>Click <a href="${link}">here</a> to accept the invitation.</p>`,
    };
    this.transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.log("err from send mail  :", err);
      } else {
        console.log("invitation Link sent successfully");
      }
    });
  }

}

export default sendOtp;