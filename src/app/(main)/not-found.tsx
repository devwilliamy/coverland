import Link from 'next/link';


export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center">
      <h5 className="text-[100px]">404</h5>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="my-4 rounded-[8px] bg-[#B9130C] px-20 py-4 text-[20px] font-[700]  text-white "
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
