import { StripeAddress } from '@/lib/types/checkout';

type SavedAddressBoxProps = {
  address: StripeAddress;
  setIsEditing: (isEditing: boolean) => void;
};
export default function SavedAddressBox({
  address,
  setIsEditing,
}: SavedAddressBoxProps) {
  const { line1, line2, city, country, postal_code } = address.address;
  return (
    <div className="mb-12 min-w-[343px] rounded-xl border border-[#707070]">
      <div className="flex flex-row py-5 pl-6 pr-5">
        <div className="flex flex-1 flex-col text-base font-normal text-[#707070]">
          <div>{address.name}</div>
          <div>{line1}</div>
          <div>{line2}</div>
          <div>
            {city} {country} {postal_code}
          </div>
        </div>
        <div
          onClick={() => setIsEditing(true)}
          className="flex-row text-sm font-normal text-[#0C87B8] underline "
        >
          Edit
        </div>
      </div>
    </div>
  );
}
