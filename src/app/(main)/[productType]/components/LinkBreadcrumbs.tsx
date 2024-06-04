'use client';
import useDetermineType from '@/hooks/useDetermineType';
import { deslugify } from '@/lib/utils';
import { useParams } from 'next/navigation';

export default function LinkBreadcrumbs() {
  const params = Object(useParams());
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const { isSeatCover } = useDetermineType();

  const getUrlFromBreadcrumbs = (index: number): string => {
    let returnString = '';
    for (let i = 0; i < index + 1; i++) {
      if (paramValues[i] === 'leather') {
        returnString = returnString + '/' + 'seat-covers';
      }
      returnString = returnString + '/' + paramValues[i];
    }
    return returnString;
  };

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {isSeatCover && (
        <div className="flex gap-1">
          <p> </p>
          <a
            href={getUrlFromBreadcrumbs(0)}
            className={`capitalize hover:underline `}
          >
            {/* Replacing hyphens with spaces (except for year_generation) */}
            Seat Covers
          </a>
          <p>/</p>
        </div>
      )}
      {params &&
        paramKeys.map((key, index) => {
          return (
            <div key={String(params[key])} className="flex gap-1">
              <p> </p>
              <a
                href={getUrlFromBreadcrumbs(index)}
                className={`hover:underline ${params[key].length < 4 ? 'uppercase' : 'capitalize'} `}
              >
                {/* Replacing hyphens with spaces (except for year_generation) */}
                {params[key] && key === 'year'
                  ? params[key]
                  : // : String(params[key]).replaceAll('-', ' ')
                    deslugify(String(params[key]))}
              </a>
              {index != paramKeys.length - 1 && <p>/</p>}
            </div>
          );
        })}
    </div>
  );
}
