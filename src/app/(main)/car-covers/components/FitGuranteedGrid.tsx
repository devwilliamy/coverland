import {
  FolderUpIcon,
  SecureIcon,
  ThumbsUpIcon,
} from '@/components/PDP/images';
import { MoneyBackIcon } from '@/components/PDP/images/MoneyBack';

const items = [
  {
    title: (
      <p>
        Fit <br /> Guranteed
      </p>
    ),
    icon: <ThumbsUpIcon />,
  },
  {
    title: (
      <p>
        Secure <br /> Shopping
      </p>
    ),
    icon: <SecureIcon />,
  },
  {
    title: (
      <p>
        30-Days <br />
        Free Returns
      </p>
    ),
    icon: <FolderUpIcon />,
  },
  {
    title: (
      <p>
        60-Days <br />
        Full Money Back
      </p>
    ),
    icon: <MoneyBackIcon />,
  },
];

const GuranteedItem = ({
  title,
  icon,
}: {
  title: JSX.Element;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex flex-row">
      <div className="flex max-h-[50px] min-h-[50px] flex-col items-center justify-center rounded-full border">
        {icon}
      </div>
      <div className="flex flex-col justify-center pl-2">
        <div className="text-[14px] font-normal leading-[19px] text-black">
          {title}
        </div>
      </div>
    </div>
  );
};

export default function FourIconGrid() {
  return (
    <section className="grid max-w-[375px] grid-cols-2 gap-4 pb-4">
      {items.map(({ title, icon }) => (
        <GuranteedItem title={title} icon={icon} />
      ))}
    </section>
  );
}
