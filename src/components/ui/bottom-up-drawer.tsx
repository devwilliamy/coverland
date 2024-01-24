import { IoClose } from 'react-icons/io5';
import { Drawer } from 'vaul';

type BottomUpDrawerProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  underTrigger?: React.ReactNode;
  footer?: React.ReactNode;
};
export default function BottomUpDrawer({
  title,
  children,
  open,
  setOpen,
  trigger,
  underTrigger,
  footer,
}: BottomUpDrawerProps): JSX.Element {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="">{trigger}</Drawer.Trigger>
      {underTrigger}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100] flex max-h-[75vh] flex-col rounded-t-[20px] bg-white">
          <div
            id="DrawerHeader"
            className="absolute left-0 top-0 z-[100] mx-[-0.05px] max-h-[175px] w-full rounded-t-[20px] bg-white px-4 "
          >
            <div className="flex items-center justify-end border-b border-[#C8C7C7]">
              <div className="flex w-full pb-4 pt-6">{title}</div>
              <div
                className="my-4 flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <IoClose className="h-[24px] w-[24px]" />
              </div>
            </div>
          </div>
          <div
            id="DrawerContentContainer"
            className="mx-auto flex w-full flex-col overflow-y-scroll px-4 pt-20"
          >
            <div>{children}</div>
          </div>
          <div id="DrawerFooterContainer">
            <div className="min-h-[5vh] w-full bg-white shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)]">
              {footer}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
