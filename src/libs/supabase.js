import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// URL dan key project Supabase SavanaHumba
const supabaseUrl = 'https://thjtduxuwuxhcnzgildf.supabase.co';
const supabaseKey = 'sb_publishable_K70FrMvJnHJ2b6Nuxnme-A_iLYUUcnc';

// Membuat client Supabase dengan AsyncStorage untuk menyimpan sesi
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});