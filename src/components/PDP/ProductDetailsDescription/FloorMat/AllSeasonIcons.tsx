import Couch from '../../icons/Couch';
import { GrayDualArrow } from '../../icons/GrayDualArrow';
import { GrayDualBlackArrow } from '../../icons/GrayDualBlackArrow';
import { GrayWrench } from '../../icons/GrayWrench';

export default function AlLSeasonicons() {
  const icons = [
    {
      title: 'Heat/Cold Resistant',
      icon: <GrayDualBlackArrow />,
    },
    { title: 'Waterproof', icon: <GrayDualBlackArrow /> },
    { title: 'Stain Resistant', icon: <GrayDualBlackArrow /> },
    { title: 'Odor-Free', icon: <GrayDualBlackArrow /> },
  ];
  return (
    <div className="grid grid-cols-4 justify-center gap-[30px] pt-[15px] max-lg:max-w-[343px] lg:gap-[60px] lg:pt-[60px]">
      {icons.map(({ title, icon }, index) => (
        <div
          key={title + index}
          className="flex flex-col items-center space-y-5"
        >
          <div className="flex max-h-[58px] min-h-[58px] max-w-[58px] lg:max-h-[100px] lg:min-h-[100px] lg:max-w-[100px] ">
            {icon}
          </div>
          <p className=" pt-1.5 text-sm text-white lg:text-[18px] lg:leading-[21px] ">
            {title}
          </p>
        </div>
      ))}
    </div>
  );
}
