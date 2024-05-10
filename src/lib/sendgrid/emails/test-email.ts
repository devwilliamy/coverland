import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const msg = {
  to: 'dev.william.coverland@gmail.com', // Change to your recipient
  from: 'info@coverland.com', // Change to your verified sender
  subject: 'Thank you for your order!',
  text: 'Order #CL. Thanks for your order, William! Placed today. Sit back and let us handle it. We\'ll reach out as soon as it\'s shipped.',
  html: `<html>
      <body>
        <p>Order #CL</p>
        <p>Thanks for your order, {name}</p>
        <p>Placed {date}</p>
        <p>Sit back and let us handle it. We’ll reach out soon to let you know order has shipped .</p>
        <p>Line Separator</p>
        <p>Delivers to:</p>
        <p>{name}</p>
        <p>{address}</p>
        <p>{city}</p>
        <p>Shipping method:</p>
        <p>{shipping}</p>
        <p>Arriving by {arrivalDate}</p>
        <p>{underline}</p>
        <CartOrderSummary/>
        <PriceOrderSummary/>
        <Card/>
        <Support/>
        <Need help?>
        <Footer/>

        <p><em>***This is an automatic notification. Replies to this email are not monitored or answered.</em></p>
      </body>
    </html>`,
};
export const sendThankYouEmail = () => {
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};
