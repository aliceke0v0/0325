// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 替換為你的 Supabase URL 和公共 API 金鑰
const supabaseUrl = 'https://xoqvgmntjvzwzqsmqvfg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvcXZnbW50anZ6d3pxc21xdmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDExNTIsImV4cCI6MjA1ODQ3NzE1Mn0.WjvMbOq1_jPFv5jNo6lM9GyPK6XD76Sf6_0iLYtmX4M';

export const supabase = createClient(supabaseUrl, supabaseKey);
