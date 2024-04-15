'use client';
import { supabaseAdminPanelDatabaseClient } from '@/lib/db/adminPaneSupabaseClient';
import { Button } from '../ui/button';

const sampleInput = {
  order_id: 'CL-253084',
  skus: [
    'CL-SC-SS-15-I-BKGR-STR-PP-200061',
    'CL-CC-CS-15-N-BKRD-STR-PP-100141',
    'CL-CC-CP-15-H-BKRD-STR-PP-100118',
    'CL-CC-CS-15-K-BKRD-STR-PP-100596',
  ],
  is_complete: true,
  total: 780,
  user_id: 1,
  transaction_id: 'pi_3P4snMDnAldfe1lt4xhsKzMN',
  payment_method: 'card',
};

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
