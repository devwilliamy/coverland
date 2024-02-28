import ExtraDetailsTabs from './components/ExtraDetailsTabs';
import { Separator } from '../ui/separator';

export function ExtraProductDetails() {
  return (
    <div className="flex w-full flex-col ">
      <Separator className="h-5 w-full border-b-[1px] border-t-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:h-10 " />
      <ExtraDetailsTabs />
    </div>
  );
}
