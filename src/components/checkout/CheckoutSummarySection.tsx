'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import PromoCode from './PromoCode';
import { useCartContext } from '@/providers/CartProvider';
import PriceBreakdown from './PriceBreakdown';
import PayPalButtonSection from './PayPalButtonSection';

export default function CheckoutSummarySection() {
  const [loading, setLoading] = useState(false);
  const { getTotalCartQuantity } = useCartContext();

  const { currentStep, nextStep, setCurrentStep } = useCheckoutContext();
  const isCartStep = currentStep === CheckoutStep.CART;

  const isCartEmpty = getTotalCartQuantity() === 0;
  return (
    <div>
      <div className="flex items-center justify-between pb-12 lg:pb-8">
        <div className="text-xl font-bold">
          {isCartStep ? 'Summary' : 'In Your Cart'}
        </div>
        {!isCartStep && (
          <div
            onClick={() => setCurrentStep(CheckoutStep.CART)}
            className="cursor-pointer font-[500] leading-[18px] underline lg:text-[16px]"
          >
            Edit
          </div>
        )}
      </div>
      {/* <div className="lg:pb-4"><PromoCode /></div> */}
      <PriceBreakdown />
      {isCartStep && (
        <div className="my-8 hidden w-full justify-center md:flex md:flex-col lg:w-[320px]">
          <Button
            variant={'default'}
            disabled={isCartEmpty}
            className={`mb-3 w-full rounded-lg ${isCartEmpty ? 'bg-[#BE1B1B]/75' : 'bg-[#BE1B1B]'}  text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
            onClick={nextStep}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Checkout'
            )}
          </Button>
          {!isCartStep && <PayPalButtonSection />}
        </div>
      )}
    </div>
  );
}
