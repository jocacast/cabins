import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ywsxckorykladsaflxqy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3c3hja29yeWtsYWRzYWZseHF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5OTc0MjAsImV4cCI6MjAxMTU3MzQyMH0.aG6BPLQg_equzhN0KIW7yNjNGl1NMdLRRHL_RYkRaPk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;