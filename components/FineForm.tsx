"use client"

import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  fineName: z.string().min(2).max(50),
  fineCost: z.number(),
  fineNote: z.string().max(250)

})

export function FineForm() {

  const addFine = async (name: string) => {
    const supabase = createClient()

    const { data: user } = await supabase.auth.getUser()
    console.log({ user })

    const { data, error } = await supabase
    .from('names')
    .insert([
      { 'created_at': new Date(), 'name': name },
      ])
      .select()
    
    console.log({ data })
  }


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fineName: "",
      fineCost: 0,
      fineNote: "",
    },
  })

    // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // addFine(values.name)
  }

  return (
    <div className="border border-1 rounded-md p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fineName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fine name</FormLabel>
                <FormControl>
                  <Input placeholder="klobbi" {...field} />
                </FormControl>
                <FormDescription>
                  Adding user to the list!.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fineCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fine cost</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormDescription>
                  Adding user to the list!.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fineNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fine note</FormLabel>
                <FormControl>
                  <Input placeholder="note.." {...field} />
                </FormControl>
                <FormDescription>
                  Adding user to the list!.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}