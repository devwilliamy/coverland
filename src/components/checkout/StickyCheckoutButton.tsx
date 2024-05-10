import { Button } from '@/components/ui/button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
export default function StickyCheckoutButton() {
  const { nextStep } = useCheckoutContext();

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] bg-white p-4 shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)] md:hidden">
      <div className="flex flex-col items-center justify-between">
        <Button
          variant={'default'}
          className="h-[48px] w-full max-w-xs rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl"
          onClick={nextStep}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
