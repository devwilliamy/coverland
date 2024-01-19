import React from 'react';

const PolicyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tracking-wide">
      <div className="">{children}</div>
    </div>
  );
};

export default PolicyLayout;
