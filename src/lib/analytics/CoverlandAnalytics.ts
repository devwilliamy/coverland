import { supabaseDatabaseClient } from '../db/supabaseClients';

export type AnalyticsData = {
  action: 'page_view' | 'add_to_cart' | 'link_click' | 'page_interaction';
  url: string;
  userAgent: string;
  timestamp: string;
  sku?: string;
  details?: string;
};

export async function sendAnalyticsServer(data: AnalyticsData) {
  const { action } = data;

  switch (action) {
    case 'page_view':
      console.log('page_view');
      await sendPageViewAnalytics(data);
      break;
    case 'add_to_cart':
      console.log('add_to_cart');
      await sendAddToCartAnalytics(data);
      break;
    case 'link_click':
      console.log('link_click');
      await sendLinkClickAnalytics(data);
      break;
    default:
      console.log('Invalid action');
  }
}

// Example implementations of the specific action handlers
async function sendPageViewAnalytics({
  url,
  userAgent,
  timestamp,
}: {
  url: string;
  userAgent: string;
  timestamp: string;
}) {
  const { error } = await supabaseDatabaseClient.from('Analytics').insert([
    {
      action: 'page_view',
      url: url,
      timestamp: timestamp, // Automatically generate the timestamp
      user_agent: userAgent,
    },
  ]);

  if (error) {
    console.error('Error sending page view to API:', error);
  }
}

async function sendLinkClickAnalytics({
  url,
  userAgent,
  timestamp,
}: {
  url: string;
  userAgent: string;
  timestamp: string;
}) {
  const { error } = await supabaseDatabaseClient.from('Analytics').insert([
    {
      action: 'link_click',
      url: url,
      timestamp: timestamp,
      user_agent: userAgent,
    },
  ]);

  if (error) {
    console.error('Error sending link click to API:', error);
  }
}

async function sendAddToCartAnalytics({
  url,
  userAgent,
  timestamp,
  sku,
}: {
  url: string;
  userAgent: string;
  timestamp: string;
  sku?: string;
}) {
  const { error } = await supabaseDatabaseClient.from('Analytics').insert([
    {
      action: 'add_to_cart',
      url: url,
      timestamp: timestamp,
      user_agent: userAgent,
      sku: sku,
    },
  ]);

  if (error) {
    console.error('Error sending add to cart to API:', error);
  }
}

export async function sendAnalyticsClient(data: AnalyticsData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const eventKey = `${data.action}-${data.url}`;

  console.log('eventKey', eventKey);

  const lastSendTime = localStorage.getItem(eventKey);
  const currentTime = Date.now();

  if (!lastSendTime || currentTime - parseInt(lastSendTime, 10) > 300000) {
    localStorage.setItem(eventKey, currentTime.toString());

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send analytics data');
      }

      console.log('Analytics data sent successfully');
    } catch (error) {
      console.error('Error sending analytics data:', error);
    }
  } else {
    console.log('Event has been sent recently, skipping...');
  }
}
