import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgShippingConfirmationTemplateId =
  process.env.SENDGRID_DELIVERY_CONFIRMATION_EMAIL_TEMPLATE_ID;