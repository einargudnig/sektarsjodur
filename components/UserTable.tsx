import { createClient } from "@/utils/supabase/server"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export async function UserTable() {
  const supabase = createClient()

  let { data: names, error } = await supabase
  .from('names')
  .select('*')
          
  console.log({names})

  return (
    <Table>
      <TableCaption>A list of user.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {names?.map((name) => (
          <TableRow key={name.id}>
            <TableCell className="font-medium">{name.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>      
    </Table>
  )
}
