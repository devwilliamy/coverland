import React from 'react';

type TabsObj = {
  title: string;
};

type StickyTabBarProps = {
  tabs: TabsObj[];
  currentTabIndex: number;
  onSelectTab: (title: string, index: number) => void;
};

export default function StickyTabBar({
  tabs,
  currentTabIndex,
  onSelectTab,
}: StickyTabBarProps) {
  return (
    <div
      id="Extra-Details-Tabs"
      className="no-scrollbar sticky top-[-1px] z-[3] flex items-center justify-items-center overflow-x-auto bg-white lg:w-full"
    >
      {tabs.map(({ title }, index) => (
        <button
          key={`Extra-Details-Tab-${index}`}
          onClick={() => onSelectTab(title, index)}
          className={`flex w-full items-center whitespace-nowrap px-2 py-2 text-[16px] text-[#767676] max-lg:min-w-max ${
            currentTabIndex === index
              ? 'border-b-2 border-b-[#BE1B1B] font-[700] text-[#BE1B1B]'
              : 'font-[400]'
          }`}
        >
          <div className="flex w-full grow justify-center px-2 py-1">
            {title}
          </div>
        </button>
      ))}
    </div>
  );
}
