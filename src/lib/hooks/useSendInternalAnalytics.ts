import { useEffect } from 'react';
import { useIsMounted } from './useIsMounted';
import { sendAnalyticsClient } from '../analytics/CoverlandAnalytics';

const useSendViewAnalytics = () => {
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) {
      sendAnalyticsClient({
        action: 'page_view',
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
    }
  }, [isMounted]);
};

export { useSendViewAnalytics };
