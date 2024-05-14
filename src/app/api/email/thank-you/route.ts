import { sendThankYouEmail } from "@/lib/sendgrid/emails/thank-you";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { emailInput } = await request.json();

    // console.log("Inside POST:", emailInput)
    await sendThankYouEmail(emailInput)
    // console.log("Mail:", mail)
    // console.log("DONE EMAIL")
    return NextResponse.json({ message: "Email sent"});
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
