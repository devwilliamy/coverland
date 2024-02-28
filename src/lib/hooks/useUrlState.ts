import { usePathname, useSearchParams, useParams } from 'next/navigation';

const useUrlState = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
