import { createFileRoute } from '@tanstack/react-router';
import Subscriptions from '@/components/subscriptions-table.tsx';

export const Route = createFileRoute('/subscriptions')({
  component: Subscription,
});

function Subscription() {
  return (
    <div className="mx-auto h-content">
      <Subscriptions />
    </div>
  );
}
