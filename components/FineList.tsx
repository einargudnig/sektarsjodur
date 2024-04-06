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


export async function FineList() {
  const supabase = createClient()

  let { data: fines, error } = await supabase
  .from('fines')
  .select('*')
          
  console.log({ fines })

  return (
    <Table>
      <TableCaption>A list of fines.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fine</TableHead>
          <TableHead>cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fines?.map((fine) => (
          <TableRow key={fine.id}>
            <TableCell className="font-medium">{fine.name}</TableCell>
            <TableCell>{fine.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>      
    </Table>
  )
}
