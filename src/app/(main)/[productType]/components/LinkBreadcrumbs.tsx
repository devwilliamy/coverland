import { TPathParams } from '../../utils';

export default function LinkBreadcrumbs({ params }: { params: TPathParams }) {
  const paramValues = Object.values(params as object);

  const getUrlFromBreadcrumbs = (index: number): string => {
    return '/' + paramValues.slice(0, index + 1).join('/');
  };

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {params &&
        paramValues.map((param, index) => {
          return (
            <div key={param} className="flex gap-1">
              <p> </p>
              <a
                href={getUrlFromBreadcrumbs(index)}
                className={`hover:underline ${param.length < 4 ? 'uppercase' : 'capitalize'} `}
              >
                {/* Replacing hyphens with spaces (except for year) */}
                {param && index === 4 ? param : param.replaceAll('-', ' ')}
              </a>
              {index != paramValues.length - 1 && <p>/</p>}
            </div>
          );
        })}
    </div>
  );
}
