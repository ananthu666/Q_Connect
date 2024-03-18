import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://prywlsdmlqxtebftnhuq.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeXdsc2RtbHF4dGViZnRuaHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTg1MTQsImV4cCI6MjAyNjMzNDUxNH0.lCvV4JLizSwymLLjbSsH5Ypw_G6cNxVcm0r9t-HqrVo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
