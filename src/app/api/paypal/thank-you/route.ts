import { NextResponse } from 'next/server';

export async function GET(req: Request, res: NextResponse) {
  console.log('REquest:', req);
  const body = await req.text();
  console.log('body', body);

  /*
    Things that are needed
    - customer info
        - name , phone, email
    - shipping info

  */
  try {
    // return NextResponse.redirect('http://localhost:3000/thank-you')
    // Process payment status and determine redirect URL
    const redirectUrl = 'http://localhost:3000/thank-you';

    // Render a small HTML page with the JavaScript to break out of the iframe
    const htmlContent = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Redirecting...</title>
   </head>
   <body>
     <script>
       if (window.top !== window.self) {
         window.top.location.href = '${redirectUrl}';
       } else {
         window.location.href = '${redirectUrl}';
       }
     </script>
   </body>
   </html>
 `;
    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return new Response('Order creation error', {
      status: 500,
    });
  }
}
