import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const modelData = [
  {
    id: 1000196,
    sku: 'CL-FM-TX-80-F-FOMU001-BK-600001',
    parent_generation: '2015-2023',
    year_generation: '2015-2023',
    make: 'Ford',
    model: 'Mustang',
    submodel1: '',
    submodel2: '',
    submodel3: '',
    feature:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/01_main_front.webp',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/01_main_front.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/02_main_back.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/03_main_both.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/04_overview.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/05_individual.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/06_trunk.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/07_non_slip%20copy.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/08_edge.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/09_easy_clean.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/10_easy_clean.webp',
    product_video_carousel_thumbnail: '',
    product_video_carousel: '',
    product_video_zoom: '',
    product_video_360: '',
    banner: '',
    type: 'Floor Mats',
    year_options: '2015,2016,2017,2018,2019,2020,2021,2022,2023',
    make_slug: 'ford',
    model_slug: 'mustang',
    msrp: 179.95,
    price: 360,
    quantity: '999',
    display_color: null,
    display_id: 'Textured',
    display_set: null,
    'skulabs SKU': 'CA-FM-TX-80-F-FOMU001-BK',
    preorder: true,
    preorder_discount: 30,
    preorder_date: '2024-12-10',
    gtin: '691140091531',
    mpn: '80-F-FOMU001-BK-600001',
    shopify_handle: null,
  },
  {
    id: 1000391,
    gtin: '691140095058',
    sku: 'CL-FM-TX-80-T-FOMU001-BK-600001',
    parent_generation: '2015-2023',
    year_generation: '2015-2023',
    make: 'Ford',
    model: 'Mustang',
    submodel1: '',
    submodel2: '',
    submodel3: '',
    feature:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/01_main_front.webp',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/01_main_front.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/02_main_back.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/03_main_both.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/04_overview.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/05_individual.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/06_trunk.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/07_non_slip%20copy.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/08_edge.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/09_easy_clean.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/Floormat/slide_image/10_easy_clean.webp',
    product_video_carousel_thumbnail: '',
    product_video_carousel: '',
    product_video_zoom: '',
    product_video_360: '',
    banner: '',
    type: 'Floor Mats',
    year_options: '2015,2016,2017,2018,2019,2020,2021,2022,2023',
    make_slug: 'ford',
    model_slug: 'mustang',
    msrp: 89.95,
    price: 180,
    'skulabs sku': 'CA-FM-TX-80-T-FOMU001-BK',
    quantity: 999,
    MPN: '80-T-FOMU001-BK-600001',
    display_id: 'Textured',
    display_set: 'Trunk Mat',
    preorder_true: true,
    preorder_date: '12/10/2024',
    preorder_discount: '$15 ',
  },
];
export default function FloorMatSelection() {
  const [selectedMats, setSelectedMats] = useState({
    floorMat: true,
    trunkMat: false,
  });

  const handleMatSelected = (matType: 'floorMat' | 'trunkMat') => {
    setSelectedMats((prev) => ({
      ...prev,
      [matType]: !prev[matType],
    }));
  };
  return (
    <div className="py-1">
      <h3 className="my-[6px] max-h-[13px] text-base font-[400] leading-[14px] text-black lg:text-lg ">
        Floor Mat Type{' '}
        <span className="ml-[2px]  text-[#8F8F8F]">
          {selectedMats.floorMat && selectedMats.trunkMat ? (
            <span>Floor Mat + Trunk Mat</span>
          ) : selectedMats.floorMat ? (
            <span>Front + Rear Seat Set</span>
          ) : (
            selectedMats.trunkMat && <span>Trunk Mat</span>
          )}
        </span>
      </h3>
      <div className="flex flex-row pt-2.5 lg:pt-3">
        <div className="flex items-center">
          <Checkbox
            id="floorMat"
            checked={selectedMats.floorMat}
            onCheckedChange={() => handleMatSelected('floorMat')}
            className="h-4 w-4  rounded-md border-[#343434] text-white data-[state=checked]:bg-[#343434] lg:h-5 lg:w-5"
          />
          <label
            htmlFor="floorMat"
            className="ml-2 text-lg font-normal lg:ml-3"
          >
            Floor Mat
          </label>
        </div>

        <div className="ml-[18px] flex flex-row items-center lg:ml-5">
          <Checkbox
            id="trunkMat"
            checked={selectedMats.trunkMat}
            onCheckedChange={() => handleMatSelected('trunkMat')}
            className="h-4 w-4 rounded-md border-[#343434] text-white data-[state=checked]:bg-[#343434] lg:h-5 lg:w-5"
          />
          <label
            htmlFor="trunkMat"
            className="ml-2 text-lg font-normal lg:ml-3"
          >
            Trunk Mat
          </label>
        </div>
      </div>
    </div>
  );
}
