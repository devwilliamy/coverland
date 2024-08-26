import { formatISODateNoTimeZone } from '@/lib/utils/date';
import { Checkbox } from '../ui/checkbox';
import LineSeparator from '../ui/line-separator';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';

type PreorderConfirmProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  setChecked: any;
};

export default function PreorderConfirm({
  checked = false,
  disabled = false,
  setChecked,
}: PreorderConfirmProps) {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  return (
    <>
      <div className="px-2 py-4">
        <div className="pb-4 text-center">
          <p className="py-4 text-2xl font-extrabold">
            This is a Pre-Order Item!
          </p>
          <div className="mb-3 mt-1 flex items-center justify-center space-x-2">
            <div className="mx-2 text-xl font-bold text-[#2BA45B]">
              Est. Ship Date:{' '}
              {formatISODateNoTimeZone(selectedProduct?.preorder_date ?? '')}
            </div>
          </div>
        </div>
        <LineSeparator className="mb-2" />
        <div className="flex py-8">
          <Checkbox
            id="preorder-acceptance"
            checked={checked}
            disabled={disabled}
            onCheckedChange={setChecked}
            className="mt-1 rounded-md border-[#343434] data-[state=checked]:bg-[#343434]"
          />
          <label
            htmlFor="preorder-acceptance"
            className={`ml-2 text-sm font-normal leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-base lg:font-medium ${
              disabled ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'
            }`}
          >
            I acknowledge that this is a preorder item and I accept the extended delivery time.
          </label>
        </div>
      </div>
    </>
  );
}
