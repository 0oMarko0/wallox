import { createFileRoute } from '@tanstack/react-router';
import { Page } from '@/components/page.tsx';
import { ProfileForm } from '@/components/profile-form.tsx';

export const Route = createFileRoute('/settings/')({
  component: () => <Settings />,
});

function Settings() {
  return (
    <Page title="Settings" description="Edit your profile and customize Wallox">
      <div className="mx-auto max-w-3xl">
        <ProfileForm />
      </div>
    </Page>
  );
}
