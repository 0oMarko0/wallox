import { HandleError, Supabase } from '@/supabase-client.ts';
import { z } from 'zod';
import { Subscription } from '@/subscription.ts';

const CATEGORIES_TABLE = 'categories';

const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

const CreateCategory = async (category: string) => {
  const { error } = await Supabase.from(CATEGORIES_TABLE).upsert(category);
  HandleError(error);
};

const ListCategories = async (): Promise<Category[]> => {
  const { data, error } = await Supabase.from(CATEGORIES_TABLE).select('id, name').returns<Category[]>();
  HandleError(error);
  return data === null ? [] : data;
};

const DeleteCategory = async (category: Category) => {
  const { error } = await Supabase.from(CATEGORIES_TABLE).delete().eq('id', category.id);
  HandleError(error);
};

export { CategorySchema, CreateCategory, ListCategories, DeleteCategory };
