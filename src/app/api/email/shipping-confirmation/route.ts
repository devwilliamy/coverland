import { sendShippingConfirmationEmailToSendGrid } from "@/lib/sendgrid/emails/shipping-confirmation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
    //   const { emailInput } = await request.json();
      const { emailInput } = await request.json();
      await sendShippingConfirmationEmailToSendGrid(emailInput)
      return NextResponse.json({ message: "Email sent"});
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: 'Error creating email' });
    }
  }