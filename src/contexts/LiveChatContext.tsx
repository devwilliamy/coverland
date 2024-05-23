'use client';
import useLiveChatControls from '@/hooks/useLiveChatControls';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type visibleType = 'hidden' | 'maximized' | 'minimized' | undefined;

type visibleContextType = {
  visible: visibleType;
  setVisible: Dispatch<SetStateAction<visibleType>>;
};
const LiveChatContext = createContext<visibleContextType>({
  visible: 'hidden',
  setVisible: () => {},
});

export const LiveChatProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<
    'hidden' | 'maximized' | 'minimized' | undefined
  >('minimized');
  return (
    <LiveChatContext.Provider value={{ visible, setVisible }}>
      {children}
    </LiveChatContext.Provider>
  );
};
export const useLiveChatContext = () => {
  return useContext(LiveChatContext);
};
