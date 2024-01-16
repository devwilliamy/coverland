'use client';

import algoliasearch from 'algoliasearch';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  InstantSearch,
  SearchBox,
  useHits,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import { generationDefaultKeys } from '@/lib/constants';
import Link from 'next/link';

function removeDuplicates(items: any[]) {
  const uniqueItems: any = [];
  const objectIds = new Set();
  // console.log(uniqueItems);
  // console.log(objectIds);

  items.forEach((item) => {
    if (!objectIds.has(`${item.model}-${item.submodel1}`)) {
      uniqueItems.push(item);
      objectIds.add(item.model);
    }
  });

  return uniqueItems;
}

export default function AlgoliaSearchbar() {
  const [showHits, setShowHits] = useState(false);

  return (
    <AlgoliaWrapper>
      <AlgoliaSearchBox setShowHits={setShowHits} />
      {showHits && <SearchHits />}
    </AlgoliaWrapper>
  );
}

const SearchHits = () => {
  const { refine } = useSearchBox();
  const { hits } = useHits();

  const uniqueHits = removeDuplicates(hits);
  const hitsToDisplay = uniqueHits.filter((hit: any) =>
    generationDefaultKeys.includes(hit.sku.slice(-6))
  );

  // console.log(hitsToDisplay);

  return (
    <div className="w-[300px] max-h-32 bg-gray-100 flex-col z-50 absolute top-14 text-center overflow-y-scroll rounded">
      {hitsToDisplay.map((hit: any) => (
        <div className="hover:bg-gray-300 my-2 " key={hit.sku}>
          <Link href={hit.product_url_slug}>
            <p>
              {hit.make} {hit.model} {hit.submodel1}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

function NoResultsBoundary({
  children,
  showHits,
  setShowHits,
}: {
  children: ReactNode;
  showHits: boolean;
  setShowHits: Dispatch<SetStateAction<boolean>>;
}) {
  const { results, indexUiState } = useInstantSearch();

  // console.log(indexUiState);
  // console.log(results);

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (
    (!results.__isArtificial && results.nbHits === 0) ||
    !indexUiState.query ||
    !showHits
  ) {
    return null;
  }

  return children;
}

function AlgoliaWrapper({ children }: { children: ReactNode }) {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ''
  );

  const customSearchClient = {
    ...searchClient,
    search<TObject>(requests: any) {
      if (requests.every(({ params }: any) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }

      return searchClient.search<TObject>(requests);
    },
  };
  return (
    <InstantSearch
      indexName="coverland_all_products"
      searchClient={customSearchClient}
    >
      {children}
    </InstantSearch>
  );
}

const AlgoliaSearchBox = ({ setShowHits }: any) => {
  const { refine } = useSearchBox();

  return (
    <SearchBox
      classNames={{
        root: 'w-full flex justify-center',
        form: 'w-full flex justify-center gap-2',
        input:
          'w-full flex justify-center h-10 p-2 bg-gray-100 rounded-2xl leading-6 self-center grow shrink basis-auto my-auto',
        submitIcon: 'w-5 h-5',
        resetIcon: 'hidden',
        loadingIcon: 'hidden',
      }}
      placeholder="What vehicle are you looking for?"
      onFocus={() => setShowHits(true)}
      onBlur={() => setShowHits(false)}
    />
  );
};
