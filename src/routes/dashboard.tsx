import { createFileRoute } from '@tanstack/react-router';
import { Page } from '@/components/page.tsx';

export const Route = createFileRoute('/dashboard')({
  component: () => <Dashboard />,
});

function Dashboard() {
  return (
    <Page title="Dashbaord" description="Some insight on your spending">
      test
    </Page>
  );
}
