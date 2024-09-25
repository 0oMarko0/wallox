import { createFileRoute } from '@tanstack/react-router';
import { SubscriptionDialog } from '@/components/subscription-dialog.tsx';

export const Route = createFileRoute('/modal')({
  component: () => <SubscriptionDialog />,
});
