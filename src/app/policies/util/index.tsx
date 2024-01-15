import React, { ReactNode } from 'react';

type PolicyDetail = {
  title: string;
  children: ReactNode;
};

export function PolicyDetailItem({ children, title }: PolicyDetail) {
  return (
    <div>
      <p className="text-2xl font-black">{title}</p>
      <div className="py-[3vh] text-lg font-thin">{children}</div>
    </div>
  );
}
