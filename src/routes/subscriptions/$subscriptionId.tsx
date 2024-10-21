import { createFileRoute } from '@tanstack/react-router';
import { FetchSubscription, Subscription } from '@/subscription.ts';
import { SubscriptionForm } from '@/components/subscription-form.tsx';
import { Page } from '@/components/page.tsx';

export const Route = createFileRoute('/subscriptions/$subscriptionId')({
  loader: async ({ params: { subscriptionId } }) => await FetchSubscription(subscriptionId),
  component: EditSubscription,
});

function EditSubscription() {
  const subscription = Route.useLoaderData() as Subscription;

  return (
    <Page title="Subscriptions" description="Edit your subscription">
      <div className="mx-auto max-w-3xl">
        <SubscriptionForm subscription={subscription} />
      </div>
    </Page>
  );
}
