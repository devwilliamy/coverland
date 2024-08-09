import React from 'react';
import { Button } from './button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
type LoadingButtonProps = {
  className: string;
  isDisabled?: boolean;
  isLoading: boolean;
  onClick: () => void;
  buttonText: string;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  className,
  isDisabled,
  isLoading,
  onClick,
  buttonText,
}) => {
  return (
    <Button
      variant="default"
      className={className}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default LoadingButton;
