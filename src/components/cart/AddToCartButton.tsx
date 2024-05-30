import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { TPathParams } from '../../utils';
import { useParams } from 'next/navigation';
import CarMagnify from '@/components/icons/CarMagnify';
import { FaSpinner } from 'react-icons/fa';

type AddToCartButtonProps = {
  handleAddToCartClicked: () => void;
  isLoading:boolean
};
export default function AddToCartButton({
  handleAddToCartClicked,
  isLoading
}: AddToCartButtonProps) {
  const params = useParams<TPathParams>();
  const isFinalSelection = params?.year;
  const [nonFinalButtonText, setNonFinalButtonText] = useState('Find your Custom-Cover');
  const blinkTime = 2;
  const blinkVel = 10;
  
  return (
    <Button
      className=" h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] lg:h-[62px]"
      onClick={handleAddToCartClicked}
    >
      <div
        className="flex gap-[10px]"
        style={
          !isFinalSelection
            ? {
                animation: `blink ${blinkTime}s cubic-bezier(0,-${blinkVel},1,${blinkVel}) infinite`,
              }
            : {}
        }
        onAnimationIteration={() => {
          setNonFinalButtonText((e) => {
            if (e === 'Start Here') {
              return 'Find your Custom-Cover';
            }
            return 'Start Here';
          });
        }}
      >
        {
        isLoading ? <FaSpinner className='animate-spin'/> :
        nonFinalButtonText === 'Start Here' && (
          // <Image alt="car-magnifying-glass" src={CarMag} />
          <div className="flex min-h-[30px] min-w-[67px]">
            <CarMagnify />
          </div>
        )}
        <p className="">
          {!isFinalSelection ? nonFinalButtonText :
           'Add To Cart'
          }
        </p>
      </div>
    </Button>
  );
}
