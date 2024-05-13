import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingCheckout = () => {
    return (
      <div className="flex flex-row items-center justify-center pt-10">
        <div className="text-lg font-normal">Your Cart is Loading...</div>
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  };