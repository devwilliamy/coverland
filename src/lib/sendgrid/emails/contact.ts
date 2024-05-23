import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type ContactEmailInput = {
  to?: string;
  from?: string;
  email?: string;
  subject: string;
  text: string;
  phoneNumber?: string;
};
const generateContactEmail = ({
  to,
  subject,
  phoneNumber,
  text,
  email,
}: ContactEmailInput) => {
  const resolvedTo = to ? to : 'info@coverland.com';
  return {
    // to: 'george.icarcover@gmail.com', // Change to your recipient
    // to: resolvedTo,
    to: ['info@coverland.com', email],
    from: 'info@coverland.com', // Process ENV
    subject: subject,
    text:
      `Customer Email: ${email} ` +
      '\n' +
      `Customer Phone: ${phoneNumber} ` +
      '\n' +
      '\n' +
      `Thank you for your response! Here is a copy of your email:` +
      '\n' +
      `${text}`,
  };
};

export const sendContactEmail = async (emailInput: ContactEmailInput) => {
  const msg = generateContactEmail(emailInput);
  console.log({ msg });

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};
