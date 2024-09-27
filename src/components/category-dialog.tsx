import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { ReactNode, useEffect, useState } from 'react';
import { Category, DeleteCategory, ListCategories } from '@/category.ts';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { Badge } from '@/components/ui/badge.tsx';

interface CategoryDialogProps {
  children?: ReactNode;
}

export function CategoryDialog(props: CategoryDialogProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    ListCategories().then((categories) => setCategories(categories));
  }, []);

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
            {/*<Form {...form}>*/}
            {/*  <form onSubmit={form.handleSubmit(() => console.log('test'))} className="space-y-8">*/}
            {/*    <div className="flex flex-row space-x-2">*/}
            {/*      <FormField*/}
            {/*        control={form.control}*/}
            {/*        name="username"*/}
            {/*        render={({ field }) => (*/}
            {/*          <FormItem>*/}
            {/*            <FormLabel>Username</FormLabel>*/}
            {/*            <FormControl>*/}
            {/*              <Input placeholder="shadcn" {...field} />*/}
            {/*            </FormControl>*/}
            {/*            <FormDescription>This is your public display name.</FormDescription>*/}
            {/*            <FormMessage />*/}
            {/*          </FormItem>*/}
            {/*        )}*/}
            {/*      />*/}
            {/*      <Button type="submit" variant="default">*/}
            {/*        <Plus className="h-4 w-4" />*/}
            {/*      </Button>*/}
            {/*    </div>*/}
            {/*  </form>*/}
            {/*</Form>*/}
          </div>
          <DialogFooter>
            <div className="flex flex-wrap space-x-2">
              {categories.map((category) => (
                <ConfirmationDialog
                  toDelete="Category"
                  confirmAction={async () => {
                    DeleteCategory(category).then(() => {
                      ListCategories().then((categories) => setCategories(categories));
                    });
                  }}>
                  <Badge className="mt-2 cursor-pointer hover:bg-red-700" variant="outline">
                    {category.name}
                  </Badge>
                </ConfirmationDialog>
              ))}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
