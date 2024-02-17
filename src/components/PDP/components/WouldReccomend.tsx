import { CheckIcon } from './icons';

export default function WouldReccomend() {
  return (
    <span className=" flex items-center gap-1.5 lg:gap-3 ">
      <div className="flex h-4 w-4 flex-shrink items-center">
        <CheckIcon />
      </div>
      <p>Would recommend</p>
    </span>
  );
}
