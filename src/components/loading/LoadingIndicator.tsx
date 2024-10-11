import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function LoadingIndicator() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-10 lg:pt-20">
      <AiOutlineLoading3Quarters className="mt-2 h-6 w-6 animate-spin text-[#BE1B1B] lg:h-12 lg:w-12" />
    </div>
  );
}
