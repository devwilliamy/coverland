import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';
import PreorderHeader from '../cart/PreorderHeader';
import PreorderPreview from '../cart/PreorderPreview';
import PreorderFooter from '../cart/PreorderFooter';
import { TInitialProductDataDB } from '@/lib/db';
import { IProductData } from '@/utils';
import { useMediaQuery } from '@mantine/hooks';
import { Separator } from '../ui/separator';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { useState } from 'react';
import PreorderConfirm from './PreorderConfirm';

type PreorderSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProduct:
    | TInitialProductDataDB
    | IProductData
    | null
    | undefined
    | TSeatCoverDataDB;
};

export type PreorderStep = 'preview' | 'confirm';

export const PREORDER_PREVIEW = 'preview';
export const PREORDER_CONFIRM = 'confirm';
const PreorderSheet = ({
  open,
  setOpen,
  selectedProduct,
}: PreorderSheetProps): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [currentStep, setCurrentStep] =
    useState<PreorderStep>(PREORDER_PREVIEW);
  const [checked, setChecked] = useState<boolean>(false);
  const handleNextStep = () => {
    switch (currentStep) {
      case PREORDER_PREVIEW:
        setCurrentStep(PREORDER_CONFIRM);
        break;
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case PREORDER_CONFIRM:
        setCurrentStep(PREORDER_PREVIEW);
        break;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case PREORDER_PREVIEW:
        return <PreorderPreview selectedProduct={selectedProduct} />;
      case PREORDER_CONFIRM:
        return <PreorderConfirm checked={checked} setChecked={setChecked} />;
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="flex flex-col gap-0 max-lg:max-h-[85vh] max-lg:rounded-t-2xl"
        side={isMobile ? 'bottom' : 'right'}
      >
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-between py-7 pl-4 pr-7">
            <PreorderHeader
              currentStep={currentStep}
              handlePreviousStep={handlePreviousStep}
            />
            <SheetClose
              asChild
              className="cursor-pointer bg-gray-200 text-black *:h-6 *:w-6"
            >
              <button
                className="rounded-full p-[5px]"
                onClick={() => {
                  setOpen(false);
                  setCurrentStep('preview');
                }}
              >
                <IoClose />
              </button>
            </SheetClose>
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <div className=" flex w-full flex-col px-4">{renderStepContent()}</div>
        <div className="w-full bg-white shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)]">
          <SheetFooter>
            <SheetClose asChild>
              <PreorderFooter
                handleNextStep={handleNextStep}
                currentStep={currentStep}
                checked={checked}
              />
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PreorderSheet;
