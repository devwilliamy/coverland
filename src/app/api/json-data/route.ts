import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const make = url.searchParams.get('make');
  const jsonPath = path.join(
    process.cwd(),
    'public',
    `${type}/${make}_${type?.replace(/-/g, '_').toLowerCase()}.json`
  );
  console.log('jsonpath', jsonPath);
  try {
    const data = await readFile(jsonPath, 'utf-8');
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
