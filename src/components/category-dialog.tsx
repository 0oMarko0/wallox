import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import React, { ReactNode, useEffect, useState } from 'react';
import { Category, DeleteCategory, ListCategories } from '@/category.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Form, useForm } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CategoryDialogProps {
  children?: ReactNode;
}
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .default('test'),
});
export function CategoryDialog(props: CategoryDialogProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'test',
    },
  });

  // useEffect(() => {
  //   ListCategories().then((categories) => setCategories(categories));
  // }, []);
  //
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit your categories</DialogTitle>
            <DialogDescription>Categories help you organize you subscriptions</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(() => console.log('test'))} className="space-y-8">
                <div className="flex flex-row space-x-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="default">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <DialogFooter>
            {/*<div className="flex flex-wrap space-x-2">*/}
            {/*  {categories.map((category) => (*/}
            {/*    <ConfirmationDialog*/}
            {/*      toDelete="Category"*/}
            {/*      confirmAction={async () => {*/}
            {/*        DeleteCategory(category).then(() => {*/}
            {/*          ListCategories().then((categories) => setCategories(categories));*/}
            {/*        });*/}
            {/*      }}>*/}
            {/*      <Badge className="mt-2 cursor-pointer hover:bg-red-700" variant="outline">*/}
            {/*        {category.name}*/}
            {/*      </Badge>*/}
            {/*    </ConfirmationDialog>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
