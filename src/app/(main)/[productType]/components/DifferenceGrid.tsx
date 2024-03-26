'use client';
import Image from 'next/image';
import BadFabric from '@/images/PDP/Product-Details-Redesign-2/bad-fabric.webp';
import PremiumFabric from '@/images/PDP/Product-Details-Redesign-2/premium-fabric.webp';
import PremiumPlusFabric from '@/images/PDP/Product-Details-Redesign-2/premium-plus-fabric.webp';
import { useParams } from 'next/navigation';
type difference = {
  title: string;
  others: JSX.Element | string;
  coverland: JSX.Element | string;
};
const premiumPlusDifferences: difference[] = [
  {
    title: 'Material',
    others: <p>Thin, Weak</p>,
    coverland: <p>Thick, High-Density</p>,
  },
  {
    title: 'Durability',
    others: <p>1-2 Years</p>,
    coverland: <p>10+ Years</p>,
  },
  {
    title: 'Waterproof',
    others: (
      <p>
        Limited <br /> (Trap Moisture)
      </p>
    ),
    coverland: (
      <p>
        Yes <br /> (Breathable)
      </p>
    ),
  },
  {
    title: 'Sun',
    others: 'Limited Protection',
    coverland: 'Full UV Block',
  },
  {
    title: 'Flexibility',
    others: 'Hard to Fit',
    coverland: 'Easy Fit + Stretch',
  },
  {
    title: 'Soft Inner',
    others: (
      <p>
        No <br /> (Risks Scratches)
      </p>
    ),
    coverland: (
      <p>
        Yes <br /> (Paint Protection)
      </p>
    ),
  },
  {
    title: 'Warranty',
    others: 'Limited Warranty',
    coverland: 'Lifetime Warranty',
  },
  {
    title: 'Value',
    others: 'Short-term Savings',
    coverland: 'Lifetime Value',
  },
];

const premiumDifferences: difference[] = [
  {
    title: 'Material',
    others: <p>Thin, Weak</p>,
    coverland: <p>High-Density</p>,
  },
  {
    title: 'Durability',
    others: <p>1-2 Years</p>,
    coverland: <p>5+ Years</p>,
  },
  {
    title: 'Waterproof',
    others: (
      <p>
        Limited <br /> (Trap Moisture)
      </p>
    ),
    coverland: (
      <p>
        Yes <br /> (Breathable)
      </p>
    ),
  },
  {
    title: 'Sun',
    others: 'Limited Protection',
    coverland: 'Full UV Block',
  },
  {
    title: 'Flexibility',
    others: 'Hard to Fit',
    coverland: 'Easy Fit ',
  },
  {
    title: 'Soft Inner',
    others: (
      <p>
        No <br /> (Risks Scratches)
      </p>
    ),
    coverland: (
      <p>
        Yes <br /> (Paint Protection)
      </p>
    ),
  },
];

export default function DifferenceGrid() {
  const params = useParams();
  const coverType = params?.coverType;
  const isDefaultCoverType =
    params?.coverType === 'premium-plus' || params?.coverType === undefined;

  const standardDifferences: difference[] = [
    {
      title: 'Material',
      others: <p>Thin, Weak</p>,
      coverland: (
        <p>
          {coverType === 'standard-pro' && 'Durable'}
          {coverType === 'standard' && 'Solid'}
        </p>
      ),
    },
    {
      title: 'Durability',
      others: (
        <p>
          {coverType === 'standard-pro' && '6-12 Months'}
          {coverType === 'standard' && '3-6 Months'}
        </p>
      ),
      coverland: (
        <p>
          {coverType === 'standard-pro' && '2+ '}
          {coverType === 'standard' && '1+ '}
          Years
        </p>
      ),
    },
    {
      title: 'Waterproof',
      others: (
        <p>
          Limited <br /> (Trap Moisture)
        </p>
      ),
      coverland: (
        <p>
          Yes <br /> (Breathable)
        </p>
      ),
    },
    {
      title: 'Sun',
      others: 'Limited Protection',
      coverland: 'UV Resistance',
    },
    {
      title: 'Flexibility',
      others: 'Hard to Fit',
      coverland: 'Easy Fit',
    },
    {
      title: 'Soft Inner',
      others: (
        <p>
          No <br /> (Risks Scratches)
        </p>
      ),
      coverland: (
        <p>
          Yes <br /> (Light-Duty)
        </p>
      ),
    },
  ];

  let differences: {
    title: string;
    others: JSX.Element | string;
    coverland: JSX.Element | string;
  }[] = [];

  switch (coverType) {
    case 'premium':
      differences = premiumDifferences;
      break;
    case 'standard-pro':
      differences = standardDifferences;
      break;
    case 'standard':
      differences = standardDifferences;
      break;
    default:
      differences = premiumPlusDifferences;
  }

  return (
    <div className="mt-[20px] px-2 pb-2 lg:w-full lg:px-0">
      <span className="flex w-full flex-col text-center">
        <p className="w-full text-[22px] font-[500] leading-[24px] text-[#EBE9E9] lg:pb-[36px] lg:text-[40px] lg:font-[500]">
          See the Difference:
        </p>
        <div className="flex pb-2 pt-4 italic lg:pb-5 lg:text-[28px] lg:font-[500] lg:leading-[24px] ">
          <p className=" w-1/2 text-[#B5B5B5]">Others</p>
          <p className=" w-1/2  text-white">Coverland</p>
        </div>
        <div className="relative flex w-full">
          <Image src={BadFabric} alt="Competitor Fabric" className="w-1/2" />
          <Image
            src={isDefaultCoverType ? PremiumPlusFabric : PremiumFabric}
            alt="Coverland Fabric"
            className={`w-1/2 border-[5px] border-[#B9130C] lg:border-[14px] ${isDefaultCoverType ? 'scale-x-[-1]' : ''} `}
          />
          <p
            className="absolute left-[49%] top-1/2 -translate-x-1/2 -translate-y-1/2 border-[#A0A0A0] text-[60px] font-[800] italic leading-[24px] text-border text-white lg:text-[108px] "
            style={{
              WebkitTextStroke: '1px #A0A0A0',
            }}
          >
            VS
          </p>
        </div>
      </span>
      <div className="mt-[34px] flex flex-col overflow-hidden rounded-md">
        {differences.map(({ title, others, coverland }, index) => (
          <div
            key={title}
            className={`grid grid-cols-[1fr_0.85fr_1fr] text-center text-[14px] text-white`}
          >
            <div
              className={`flex w-full items-center ${index + 1 !== differences.length && 'border-b-[1px] border-b-[#5D5D5D]'} justify-center  bg-[#333333] px-1 py-[14px] text-[#B5B5B5]`}
            >
              {others}
            </div>
            <div className="flex w-full items-center justify-center bg-black/80 px-2 py-[14px] text-[12px]">
              {title}
            </div>
            <div
              className={`flex w-full items-center justify-center ${index + 1 !== differences.length && 'border-b-[1px] border-b-[#C94F4F]'} bg-[#981D18] px-1 py-[14px]`}
            >
              {coverland}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
