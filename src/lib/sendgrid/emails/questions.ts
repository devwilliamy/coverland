import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type ContactEmailInput = {
  name?: string;
  email?: string;
  message: string;
};
const generateQuestionsEmail = ({
  name,
  email,
  message,
}: ContactEmailInput) => {
  const additionalEmails = [
    'info@coverland.com',
    'dev.william.coverland@gmail.com',
    'vasiliy@coverland.com',
    email?.toLowerCase(),
  ];

  const removeDuplicates = [...new Set(additionalEmails)];

  const testEmail = 'dev.william.coverland@gmail.com'; // change for development emails
  const prodEmail =
    process.env.NODE_ENV !== 'development' ? removeDuplicates : testEmail;
  return {
    to: prodEmail,
    from: 'info@coverland.com', // Process ENV
    subject: 'Customer Question',
    text:
      '\n' +
      `Thank you for reaching out to us! We have received your message and appreciate your interest. Our team will review your inquiry and we\'ll reach back shortly` +
      '\n' +
      '\n' +
      '\n' +
      `Here is a copy of your email:` +
      '\n' +
      `Customer Name: ${name}  ` +
      '\n' +
      `Customer Email: ${email}  ` +
      '\n' +
      '\n' +
      `${message}`,
  };
};

export const sendQuestionsEmail = async (emailInput: ContactEmailInput) => {
  const msg = generateQuestionsEmail(emailInput);
  console.log(msg);
  try {
    await sgMail.send(msg as MailDataRequired);
  } catch (error) {
    console.error('Send Question Email error:', error);
  }
};
