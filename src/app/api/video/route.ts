import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the Auth Helpers package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
//   const requestUrl = new URL(request.url);
//   const url = requestUrl.searchParams.get('url');

//   if (!url) {
//     return new Response('Missing url parameter', { status: 400 })
//   }

//   const response = await fetch(url)
//   console.log("Response:", response)
//   const body = await response.arrayBuffer()
//   console.log("Body:", body)


//   // URL to redirect to after sign in process completes
//   return new NextResponse(body, {
//     headers: {
//       'Content-Type': response.headers.get('Content-Type'),
//       'Content-Length': body.length.toString(),
//       'Access-Control-Allow-Origin': '*'
//     },
//   })
// }


export { GET } from 'next-video/request-handler';
