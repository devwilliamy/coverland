import { readFile } from 'fs/promises';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const make = url.searchParams.get('make');

  try {
    const data = await readFile(
      process.cwd() +
        `/${type}/${make}_${type?.replace(/-/g, '_').toLowerCase()}.json`,
      'utf-8'
    );
    console.log(data);
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    return new Response(JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error(error);
    return new Response('Error fetching data', {
      status: 500,
    });
  }
}
