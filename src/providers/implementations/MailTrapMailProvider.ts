import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "980f990f98658b",
          pass: "40ce5d9b20fc64"
        }
      }
    )
  }
  
  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail(
      {
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: message.from.name,
          address: message.from.email
        },
        subject: message.subject,
        html: message.body
      }
    )
  }
}