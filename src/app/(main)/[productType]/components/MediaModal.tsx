import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

function MediaModal({
  thumbnail,
  children,
}: {
  thumbnail: StaticImageData;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Dialog>
      <DialogTrigger className="">
        <Image alt="" src={thumbnail} className="flex h-full w-full" />
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center lg:min-w-[77vw] lg:max-w-[1120px]">
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default MediaModal;
