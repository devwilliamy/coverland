import Link from 'next/link';

type TermsOfUseStatementProps = {
  isPaypal?: boolean;
};
export const TermsOfUseStatement = ({
  isPaypal = false,
}: TermsOfUseStatementProps) => {
  const initialStatement = isPaypal
    ? 'By checking out with PayPal'
    : 'By clicking the "Submit Payment" button';
  return (
    <p className="pb-[30px] text-[14px] font-[400] text-[#767676] lg:border-t lg:border-[#DBDBDB] lg:pb-[36px] lg:pt-[35px]">
      {initialStatement}, you confirm that you have read, understand, and accept
      our Terms of Use,{' '}
      <Link href="/policies/privacy-policy" className="underline">
        Privacy Policy
      </Link>
      ,{' '}
      <Link href="/policies/return-policy" className="underline">
        Return Policy
      </Link>
    </p>
  );
};
