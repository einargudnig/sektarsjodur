import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  
  let { data: notes } = await supabase
    .from('notes')
    .select('*')
          
  console.log({ notes })


  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}