import {HandleError, Supabase} from "@/supabase-client.ts";
import {z} from "zod";

const CATEGORIES_TABLE = "categories";

const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
});

export type Category = z.infer<typeof CategorySchema>;

const ListCategories = async (): Promise<Category[]> => {
    const {data, error} = await Supabase.from(CATEGORIES_TABLE).select('id, name').returns<Category[]>();
    HandleError(error)
    return data === null ? [] : data
}

export {
    CategorySchema,
    ListCategories
}