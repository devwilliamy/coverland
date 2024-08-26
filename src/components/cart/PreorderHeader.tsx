import { ArrowLeft } from 'lucide-react';
import { PREORDER_CONFIRM, PreorderStep } from './PreorderSheet';

type PreorderHeaderProps = {
  currentStep: PreorderStep;
  handlePreviousStep: () => void;
};
const PreorderHeader = ({
  currentStep,
  handlePreviousStep,
}: PreorderHeaderProps): JSX.Element => {
  return (
    <div>
      <div className="flex flex-row ">
        {currentStep === PREORDER_CONFIRM && (
          <ArrowLeft onClick={handlePreviousStep} />
        )}
      </div>
    </div>
  );
};

export default PreorderHeader;
