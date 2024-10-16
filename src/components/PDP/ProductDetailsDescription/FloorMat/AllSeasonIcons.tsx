import ShieldWithCheck from '../../icons/ShieldWithCheck';
import SunThermometer from '../../icons/SunThermometer';
import Waterdrop from '../../icons/Waterdrop';
import WindBlowingGerms from '../../icons/WindBlowingGerms';

export default function AllSeasonIcons() {
  const icons = [
    {
      title: 'Heat/Cold Resistant',
      icon: <SunThermometer width={100} height={100} />,
    },
    { title: 'Waterproof', icon: <Waterdrop width={100} height={100} /> },
    {
      title: 'Stain Resistant',
      icon: <ShieldWithCheck width={100} height={100} />,
    },
    { title: 'Odor-Free', icon: <WindBlowingGerms width={100} height={100} /> },
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
