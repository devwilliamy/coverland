import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <LoadingSkeleton />
      <MobileSkeleton />
    </>
  );
}

const LoadingSkeleton = () => (
  <div className="hidden w-full flex-col items-start justify-between lg:flex-row lg:gap-14">
    <div className="mt-[75px]  flex w-[724px] flex-col items-stretch justify-center lg:pb-0 ">
      <Skeleton className="h-[650px] bg-slate-500" />
    </div>
    <div className=" mt-[75px] flex h-screen w-full flex-col justify-stretch pl-0 lg:w-2/5">
      <div className="h-[118px] w-full ">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="mt-[75px] h-[350px] w-full ">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  </div>
);

const MobileSkeleton = () => (
  <div className="mt-[25px] flex min-h-screen flex-col gap-4 lg:hidden">
    <Skeleton className="h-[430px]" />
    <Skeleton className="h-[80px]" />
    <div className="mt-6 flex flex-col gap-8">
      <Skeleton className="h-[80px]" />
      <Skeleton className="h-[80px]" />
    </div>
  </div>
);
