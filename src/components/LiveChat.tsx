'use client';
import { useLiveChatContext } from '@/contexts/LiveChatContext';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

const LiveChatWidget = dynamic(
  () => import('@livechat/widget-react').then((mod) => mod.LiveChatWidget),
  {
    ssr: false,
  }
);

export default function LiveChat() {
  const { visible, setVisible } = useLiveChatContext();
  return (
    <div className="!fixed !bottom-0 !right-0">
      <LiveChatWidget license="14897064" visibility={visible} />
    </div>
  );
}
