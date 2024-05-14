import sgMail from "@sendgrid/mail";

export type SendGridEmail = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async (email: SendGridEmail) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
  const emailConfirmation = await sgMail.send(email)
  return emailConfirmation;
};