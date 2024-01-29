import { usePathname, useSearchParams, useParams } from 'next/navigation';

const useUrlState = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //Do not use the params returned from this hook outside of the 'car-covers' path for now
  const params = useParams() ?? {
    make: '',
    model: '',
    year: '',
  };

  const submodelParam = searchParams?.get('submodel') ?? null;
  const secondSubmodelParam = searchParams?.get('second_submodel') ?? null;

  const currentUrl = `${pathname}${submodelParam || secondSubmodelParam ? `?${searchParams}` : ''}`;

  return { submodelParam, secondSubmodelParam, currentUrl, params };
};

export default useUrlState;
