import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const LoadingCheckout = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="text-lg font-medium">Your Cart is Loading...</div>
      <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin mt-2 text-[#BE1B1B] " />
    </div>
  );
};
