import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgShippingConfirmationTemplateId = process.env.SENDGRID_SHIPPING_CONFIRMATION_EMAIL_TEMPLATE_ID;
import { formatMoneyAsNumber } from '@/lib/utils/money';
// import fetchUserOrderById
// import { TUserOrder, TOrderItem, TOrderItemProduct, fetchUserOrderById } from '@/lib/db/profile/ordersHistory';
import { SHIPPING_METHOD } from '@/lib/constants';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';


const shippingConstants = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd'), //this needs to be grabbed from somewhere (stored?)
    delivery_fee: shipping || 0,
  };

type DynamicTemplateData = {
    ordered_on: string;
    shipped_on: string; //check for order.shipping_status == "shipped" and order.previous_status == "unstarted"
    expected_delivery_on: string;
    tracking_number: string;
    tracking_url: string;
    customer_name: string;
    order_detail_page: string // url to order detail page (order.id)
    order_items: OrderItem[];
    shipping_info: ShippingInfo;
  };

  type ShippingInfo = {
    full_name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    shipping_method: string;
    shipping_date: string;
    delivery_fee: number;
    free_delivery: boolean;
  };

const generateDynamicTemplateData(order: TUserOrder) {
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