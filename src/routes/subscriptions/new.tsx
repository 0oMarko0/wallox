import { createFileRoute } from '@tanstack/react-router';
import { SubscriptionForm } from '@/components/subscription-form.tsx';

export const Route = createFileRoute('/subscriptions/new')({
  component: () => <NewSubscription />,
});

function NewSubscription() {
  return (
    <div className="mx-auto max-w-3xl">
      <SubscriptionForm />
    </div>
  );
}
