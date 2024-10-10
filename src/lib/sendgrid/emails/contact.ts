import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type ContactEmailInput = {
  to?: string;
  from?: string;
  email: string;
  name: string;
  subject?: string;
  phoneNumber?: string;
  text: string;
};
const generateContactEmail = ({
  name,
  email,
  subject,
  phoneNumber,
  text,
}: ContactEmailInput) => {
  return {
    to: ['cs@coverland.com', email],
    from: 'Coverland Support <cs@coverland.com>', // Process ENV
    subject: subject,
    text:
      `Customer Name: ${name} ` +
      '\n' +
      `Customer Email: ${email} ` +
      '\n' +
      `${phoneNumber ? 'Customer Phone:' + phoneNumber : null}` +
      '\n' +
      '\n' +
      `Thank you for contacting us! Our team will review your message and will reach back shortly. Here's a copy of your message: ` +
      '\n' +
      '\n' +
      `${text}`,
  };
};

export const sendContactEmail = async (emailInput: ContactEmailInput) => {
  const msg = generateContactEmail(emailInput);

  try {
    await sgMail.send(msg as MailDataRequired);
  } catch (error) {
    console.error(error);
  }
};
