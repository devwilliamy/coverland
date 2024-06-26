import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgShippingConfirmationTemplateId = process.env.SENDGRID_SHIPPING_CONFIRMATION_EMAIL_TEMPLATE_ID;
// import fetchUserOrderById

const generateDynamicTemplateData(order) {
    return order.map(({
        
    }) =>{
        {
            name: fullProductName || `${display_id}${trademark} ${type}`,
            vehicle: `${make} ${model} ${year_generation} ${submodel1 || ''} ${submodel2 || ''} ${submodel3 || ''}`.trim(),
            color: display_color,
            quantity: quantity,
            price: msrp,
            total_price: formatMoneyAsNumber(msrp * quantity),
            img_url: mainImage || feature || product.split(',')[0],
            full_set: type === 'Seat Covers' ? isFullSet(display_set).toLowerCase() == "full" ? "Full Seat Set (Front + Rear Seat Set)": 'Front Seats (Driver +  Passenger seats)' : display_set,
          }
    })
}

const generateShippingConfirmationEmail(data): MailDataRequired => {
    {
        from: { email: sgFromEmail },
        template_id: sgShippingConfirmationTemplateId,   
        personalizations: [
            to: [{email: "customer@gmail.com"}],
            dynamic_template_data: data.dynamic_template_data,
        ]
    },
}

export const sendShippingConfirmationEmail = async (data: MailDataRequired) => {
    try{
        await sgMail.send(data);
    } catch (error) {
        console.error(error);

    // Check if err.response exists to get more details
    if (error.response) {
        console.error('Error Response:', error.response.body);
  
        // Log each error in the errors array
        if (error.response.body.errors) {
          error.response.body.errors.forEach((error: any) => {
            console.error('Error Detail:', error);
          });
        }
      }
    }
}