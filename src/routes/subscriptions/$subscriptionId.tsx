import { createFileRoute } from '@tanstack/react-router';
import { FetchSubscription } from '@/subscription.ts';
import { SubscriptionDialog } from '@/components/subscription-dialog.tsx';

export const Route = createFileRoute('/subscriptions/$subscriptionId')({
  loader: async ({ params: { subscriptionId } }) => await FetchSubscription(subscriptionId),
  component: EditSubscription,
});

function EditSubscription() {
  const subscription = Route.useLoaderData();

  return <SubscriptionDialog subscription={subscription} />;
}
