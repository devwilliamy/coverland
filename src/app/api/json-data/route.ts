import { readFile } from 'fs/promises';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const make = url.searchParams.get('make');
  console.log(type, make);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Access-Control-Allow-Credentials': 'true',
  };

  const data = await readFile(
    process.cwd() +
      `/public/data/${type}/${make}_${type?.replace(/-/g, '_').toLowerCase()}.json`,
    'utf-8'
  );
  console.log(data);
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  return Response.json({
    data: jsonData,
    headers: {
      ...corsHeaders,
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
  });
}
