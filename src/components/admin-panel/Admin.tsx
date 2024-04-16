'use client';
import { supabaseAdminPanelDatabaseClient } from '@/lib/db/adminPaneSupabaseClient';
import { Button } from '../ui/button';

export default function Admin() {
  const handleClicked = async () => {
    console.log('HnaldeClick');
    const response = await fetch('/api/admin-panel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   paymentIntentId,
      //   amount: totalMsrpPrice,
      // }),
    });

    console.log('response:', response);
  };
  return (
    <div>
      <h1>Admin</h1>
      <Button onClick={handleClicked}>Submit Order</Button>
    </div>
  );
}
