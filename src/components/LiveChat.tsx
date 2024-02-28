'use client';
import dynamic from 'next/dynamic';

const LiveChatWidget = dynamic(
  () => import('@livechat/widget-react').then((mod) => mod.LiveChatWidget),
  {
    ssr: false,
  }
);

export default function LiveChat() {
  return (
    <div className="!fixed !bottom-0 !right-0">
      {/* <LiveChatWidget license="14897064" /> */}
    </div>
  );
}
