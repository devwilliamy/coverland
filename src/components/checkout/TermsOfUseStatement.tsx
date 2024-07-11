'use client';
export const TermsOfUseStatement = () => {
  return (
    <p className="text-[14px] font-[400] text-[#767676] lg:border-t lg:border-[#DBDBDB] lg:pb-[48px] lg:pt-[35px]">
      By clicking the “Submit Payment” button, you confirm that you have read,
      understand, and accept our Terms of Use,{' '}
      <a href="/policies/privacy-policy" className="underline">
        Privacy Policy,
      </a>{' '}
      <a href="/policies/return-policy" className="underline">
        Return Policy
      </a>
    </p>
  );
};
