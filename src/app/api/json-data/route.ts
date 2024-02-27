import { readFile } from 'fs/promises';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const make = url.searchParams.get('make');
  console.log(url);

  const data = await readFile(
    process.cwd() +
      `/public/data/${type}/${make}_${type?.replace(/-/g, '_')}.json`,
    'utf-8'
  );
  const jsonData = JSON.parse(data);
  return Response.json(jsonData);
}
