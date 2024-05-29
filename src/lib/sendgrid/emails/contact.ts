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
    to: ['info@coverland.com', email],
    from: 'info@coverland.com', // Process ENV
    subject: subject,
    text:
      `Customer Name: ${name} ` +
      '\n' +
      `Customer Email: ${email} ` +
      '\n' +
      ` ${phoneNumber ? 'Customer Phone:' + phoneNumber : null}` +
      '\n' +
      '\n' +
      `Thank you for your response! How can we help you?` +
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
