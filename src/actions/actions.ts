// 'use server';

// import { Database } from '@/lib/db/types';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
// const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// export const postSubscriberEmail = async (
//   formData: React.FormEvent<HTMLFormElement>
// ) => {
//   const { error } = await supabase
//     .from('_Subscriber-Emails')
//     .insert({ email })
//     .not('email', 'is', null);

//   if (error) {
//     console.log(error);
//   }
//   // return data
// };
