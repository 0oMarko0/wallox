import { createFileRoute } from '@tanstack/react-router';
import { SubscriptionForm } from '@/components/subscription-form.tsx';
import { Page } from '@/components/page.tsx';

export const Route = createFileRoute('/subscriptions/new')({
  component: () => <NewSubscription />,
});

function NewSubscription() {
  return (
    <Page title="New Subscription" description="hello">
      <div className="mx-auto max-w-3xl mt-8">
        <SubscriptionForm />
      </div>
    </Page>
  );
}
