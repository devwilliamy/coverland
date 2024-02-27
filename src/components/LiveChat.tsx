'use client';
import { LiveChatWidget } from '@livechat/widget-react';

export default function LiveChat() {
  return (
    <div className="!fixed !bottom-0 !right-0">
      <LiveChatWidget license="14897064" />
    </div>
  );
}
