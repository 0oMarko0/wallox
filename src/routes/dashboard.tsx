import { createFileRoute } from '@tanstack/react-router';
import { Page } from '@/components/page.tsx';

export const Route = createFileRoute('/dashboard')({
  component: () => <Dashbaord />,
});

function Dashbaord() {
  return (
    <Page title="Dashbaord" description="Some insight on your spending">
      test
    </Page>
  );
}
