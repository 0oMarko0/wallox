import { createRootRoute, Outlet } from '@tanstack/react-router';
import { LayoutDashboard, Settings, Wallet } from 'lucide-react';
import { Navigation } from '@/components/navigation.tsx';
import { ReactNode } from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <Root>
        <Outlet />
      </Root>
      {/*<TanStackRouterDevtools />*/}
    </>
  ),
});

interface RootProps {
  children: ReactNode;
}

function Root(props: RootProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Navigation
          items={[
            {
              node: <Wallet className="h-5 w-5" />,
              tooltip: 'Subscriptions',
              page: '/subscriptions',
              search: {
                page: 0,
                perPage: 25,
              },
            },
            {
              node: <LayoutDashboard className="h-5 w-5" />,
              tooltip: 'Dashboard',
              page: '/dashboard',
            },
            {
              node: <Settings className="h-5 w-5" />,
              tooltip: 'Setting',
              page: '/settings',
            },
          ]}
        />
      </aside>
      {/*<div className="container pl-14 mx-auto mt-8">{props.children}</div>*/}
      <div className="pl-14 min-h-screen w-ful">{props.children}</div>
    </div>
  );
}
