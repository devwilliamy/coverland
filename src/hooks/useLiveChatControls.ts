import { useState } from 'react';

function useLiveChatControls() {
  const [visible, setVisible] = useState<
    'maximized' | 'minimized' | 'hidden' | undefined
  >('hidden');
  return { visible, setVisible };
}

export default useLiveChatControls;
