import { z } from 'zod';
import { Frequency } from '@/frequency.ts';
import { HandleError, Supabase } from '@/supabase-client.ts';
import { add } from 'date-fns';
import { CategorySchema } from '@/category.ts';
import { PaymentMethodsSchema } from '@/payment-methods.ts';
import { Page, PageToRange } from '@/page.ts';

const SUBSCRIPTION_TABLE = 'subscriptions';

const SubscriptionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(50),
  payment_every: z.coerce.number().min(1).default(1),
  payment_frequency: z.string().min(0).default(Frequency.MONTH),
  last_payment_date: z.date().default(new Date()),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value)),
  payment_methods_id: z.number(),
  category_id: z.number(),
  paid_by: z.string().min(0),
  note: z.string().min(0),
  category: CategorySchema.optional(),
  payment_methods: PaymentMethodsSchema.optional(),
});

const FormSubscriptionSchema = SubscriptionSchema.omit({
  id: true,
  category: true,
  payment_methods: true,
});

type Subscription = z.infer<typeof SubscriptionSchema>;

const DefaultSubscription: Subscription = {
  name: '',
  payment_every: 1,
  payment_frequency: Frequency.MONTH,
  last_payment_date: new Date(),
  payment_methods_id: 0,
  price: 0,
  category_id: 0,
  paid_by: '',
  note: '',
};

const NextPaymentDate = (subscription: Subscription) => {
  switch (subscription.payment_frequency) {
    case Frequency.WEEK:
      return add(subscription.last_payment_date, { weeks: subscription.payment_every });
    case Frequency.MONTH:
      return add(subscription.last_payment_date, { months: subscription.payment_every });
    case Frequency.YEAR:
      return add(subscription.last_payment_date, { years: subscription.payment_every });
  }
};

const ListSubscriptions = async (page: Page): Promise<Subscription[]> => {
  const { start, end } = PageToRange(page);
  const { data, error } = await Supabase.from(SUBSCRIPTION_TABLE)
    .select(
      `
          id,
          name,
          payment_every,
          payment_frequency,
          last_payment_date,
          price,
          paid_by,
          note,
          created_at,
          category_id,
          payment_methods_id,
          categories (name),
          payment_methods (name)
    `,
    )
    .order('created_at', { ascending: false })
    .range(start, end)
    .returns<Subscription[]>();

  HandleError(error);

  if (data === null || data === undefined) {
    return [];
  }

  return data.map((subscription) => ({
    ...subscription,
    last_payment_date: new Date(subscription.last_payment_date),
  }));
};

const CountSubscriptions = async () => {
  const { error, count } = await Supabase.from(SUBSCRIPTION_TABLE).select('*', { count: 'exact' });
  HandleError(error);

  return count;
};

const DeleteSubscription = async (subscription: Subscription) => {
  const { error } = await Supabase.from(SUBSCRIPTION_TABLE).delete().eq('id', subscription.id);
  HandleError(error);
};

const CreateOrUpdateSubscription = async (subscription: Subscription) => {
  if (subscription?.id) {
    await UpdateSubscription(subscription.id, subscription);
  } else {
    await CreateSubscription(subscription);
  }
};

const UpdateSubscription = async (id: string, subscription: Subscription) => {
  const { error } = await Supabase.from(SUBSCRIPTION_TABLE).update(subscription).eq('id', id);
  HandleError(error);
};

const CreateSubscription = async (subscription: Subscription) => {
  const { error } = await Supabase.from(SUBSCRIPTION_TABLE).insert(subscription).select();
  HandleError(error);
};

export {
  SubscriptionSchema,
  FormSubscriptionSchema,
  DefaultSubscription,
  NextPaymentDate,
  ListSubscriptions,
  CountSubscriptions,
  DeleteSubscription,
  CreateOrUpdateSubscription,
  CreateSubscription,
  UpdateSubscription,
};
export type { Subscription };
