import Couch from '../../icons/Couch';
import { GrayDualArrow } from '../../icons/GrayDualArrow';
import { GrayWrench } from '../../icons/GrayWrench';

export default function AlLSeasonicons() {
  const icons = [
    { title: 'Heat/Cold Resistant', icon: <GrayDualArrow /> },
    { title: 'Waterproof', icon: <GrayDualArrow /> },
    { title: 'Stain Resistant', icon: <GrayDualArrow /> },
    { title: 'Odor-Free', icon: <GrayDualArrow /> },
  ];
  return (
    <div className="mt-[30px] grid grid-cols-4 items-center justify-center gap-[30px] max-lg:max-w-[317px] lg:gap-[120px]">
      {icons.map(({ title, icon }, index) => (
        <div key={title + index} className="flex flex-col items-center ">
          <div className="flex max-h-[58px] min-h-[58px] max-w-[58px] lg:max-h-[100px] lg:min-h-[100px] lg:max-w-[100px] ">
            {icon}
          </div>
          <p className="pt-1.5 text-sm text-white lg:text-[18px] lg:leading-[21px] ">
            {title}
          </p>
        </div>
      ))}
    </div>
  );
}
