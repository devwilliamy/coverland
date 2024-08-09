'use client';
import useFilterHandler from '@/hooks/review/useFilterHandler';
import useSortHandler from '@/hooks/review/useSortHandler';

export default function ReviewFilters() {
  const { handleSortSelectionChange } = useSortHandler();
  const { handleFilterSelectionChange } = useFilterHandler();

  return (
    <div className="flex w-full items-center justify-end gap-1 pt-7 *:rounded-lg  lg:gap-4">
      <select
        className=" h-12 rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A] max-lg:max-w-[100px]"
        onChange={handleSortSelectionChange}
        defaultValue={'sort'}
      >
        <option disabled className="hidden" value="sort">
          Sort
        </option>
        <option value="helpful">Most helpful</option>
        <option value="newest">Most recent</option>
        {/* <option value="oldest">Sort By Oldest</option> */}
      </select>

      <select
        className=" h-12 rounded border border-[#C8C7C7] bg-transparent px-4 text-lg font-normal capitalize text-[#1A1A1A] max-lg:max-w-[100px] "
        onChange={handleFilterSelectionChange}
        defaultValue={'filter'}
      >
        <option disabled className="hidden" value="filter">
          Filter
        </option>
        <option value="images">Images only</option>
        {/* <option value="verified">Verified Purchases Only</option> */}
        <option value="positive">Positive reviews</option>
        <option value="critical">Critical reviews</option>
      </select>
    </div>
  );
}
