'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';
import Link from 'next/link';

export default function AnnouncementDialog() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showAnnouncement = localStorage.getItem(
        'showCustomerServiceEmailAnnouncement'
      );

      // If it's their first visit, or they haven't opted out, show the announcement
      if (showAnnouncement !== 'FALSE') {
        setOpen(true);
      }
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDoNotShowAgain = () => {
    localStorage.setItem('showCustomerServiceEmailAnnouncement', 'FALSE');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogOverlay className="z-[101]" />
      <DialogContent className="z-[102]">
        <DialogHeader>
          <DialogTitle>Important Customer Service Update</DialogTitle>
          <DialogDescription>
            We are currently updating our customer service email contact. For
            any inquiries or assistance, please reach out to us at{' '}
            <Link
              href="mailto: support@coverland.com"
              target="_blank"
              className="font-bold underline"
            >
              support@coverland.com
            </Link>
            . Our team is here to help and will respond as promptly as possible.
            Thank you for your understanding and continued support!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            className="border border-black bg-white text-black hover:bg-white hover:opacity-70"
            onClick={handleDoNotShowAgain}
          >
            Don't show again
          </Button>
          <Button type="submit" onClick={handleClose}>
            Thank you!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
