// import { SendGridEmail, sendEmail } from "..";

// export const sendForgotPasswordEmail = async (email: string): Promise<any> => {
//     const uuid = uuidv4();
//     const resetPasswordUrl = `${process.env.WEB_URL}/reset-password/${uuid}`;
//     const sendGridEmail: SendGridEmail = {
//       to: email,
//       from: process.env.FORGOT_PASSWORD_EMAIL,
//       subject: "Order Confirmation for {name} #CL...",
//       text: "",
//       html: `<html>
//       <body>
//         <p>Order #CL</p>
//         <p>Thanks for your order, {name}</p>
//         <p>Placed {date}</p>
//         <p>Sit back and let us handle it. We’ll reach out soon to let you know order has shipped .</p>
//         <p>Line Separator</p>
//         <p>Delivers to:</p>
//         <p>{name}</p>
//         <p>{address}</p>
//         <p>{city}</p>
//         <p>Shipping method:</p>
//         <p>{shipping}</p>
//         <p>Arriving by {arrivalDate}</p>
//         <p>{underline}</p>
//         <CartOrderSummary/>
//         <PriceOrderSummary/>
//         <Card/>
//         <Support/>
//         <Need help?>
//         <Footer/>

//         <p><em>***This is an automatic notification. Replies to this email are not monitored or answered.</em></p>
//       </body>
//     </html>`,
//     };
//     try {
//       const user = await userService.findOne(email, "email");
//       const resetPasswordFound = await resetPasswordService.findResetPassword(
//         email
//       );
//       try {
//         if (user && resetPasswordFound) {
//           await resetPasswordService.updateResetPasswordUrl(email, uuid);
//         } else if (user) {
//           await resetPasswordService.createResetPassword(email, uuid);
//         } else {
//           throw "Email does not exist";
//         }
//       } catch (e: any) {
//         const errorMessage = e.response?.body?.errors || e.message;
//         console.error(
//           `[Forgot Password]: ${errorMessage[0]?.message || errorMessage}`
//         );
//       }
//       await sendEmail(sendGridEmail);
//       return resetPasswordUrl;
//     } catch (e) {
//       throw e;
//     }
//   };