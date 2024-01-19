import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Tab = {
  name: string;
  href: string;
  current: boolean;
};

type FullWidthTabsProps = {
  tabs: Tab[];
};

export default function FullWidthTabs({ tabs }: FullWidthTabsProps) {
  return (
    <>
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-[#185CFF] text-[#1A1A1A]'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
