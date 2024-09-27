import { createFileRoute } from '@tanstack/react-router';
import Subscriptions from '@/components/subscriptions-table.tsx';
import { Page } from '@/components/page.tsx';

export const Route = createFileRoute('/subscriptions/')({
  component: () => <SubscriptionsTable />,
});

function SubscriptionsTable() {
  return (
    <Page title="Subscriptions" description="Add a new subscription">
      <Subscriptions />
    </Page>
  );
}
