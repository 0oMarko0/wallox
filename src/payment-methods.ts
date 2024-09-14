import {HandleError, Supabase} from "@/supabase-client.ts";
import {z} from "zod";

const PAYMENT_METHODS_TABLE = "payment_methods";

const PaymentMethodsSchema = z.object({
    id: z.number(),
    name: z.string()
});

export type PaymentMethods = z.infer<typeof PaymentMethodsSchema>;

const ListPaymentMethods = async (): Promise<PaymentMethods[]> => {
    const {data, error} = await Supabase.from(PAYMENT_METHODS_TABLE).select('id, name').returns<PaymentMethods[]>();
    HandleError(error)
    return data === null ? [] : data
}

export {
    PaymentMethodsSchema,
    ListPaymentMethods
}