import nodemailer from 'nodemailer'

interface emailMustHave {
  send():void
}
export class Email implements emailMustHave{
  private transporter = nodemailer.createTransport({
    host: String(process.env.EMAIL_HOST),
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.EMAIL_SECURE),
    auth: {
      user: String(process.env.EMAIL_ADDRESS),
      pass: String(process.env.EMAIL_PASS),
    },
  });

  constructor(
    private emailTo: string,
    private subject: string,
    private text: string,
    private html: string
  ){}

  async send(){
    return await this.transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: this.emailTo,
      subject: this.subject,
      text: this.text,
      html: this.html,
    });
  }
}
