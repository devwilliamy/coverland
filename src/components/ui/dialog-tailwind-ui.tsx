'use client';
import { Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import AddToCartHeader from '../cart/AddToCartHeader';
import AddToCartBody from '../cart/AddToCartBody';
import AddToCartFooter from '../cart/AddToCartFooter';

type DialogProps = {
  //   title: React.ReactNode;
  //   children: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
};

export default function Dialog({ open, setOpen }: DialogProps) {
  //   const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <HeadlessDialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      <AddToCartHeader />
                    </HeadlessDialog.Title>
                    <div className="mt-2">
                      <AddToCartBody />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <AddToCartFooter />
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
}
