import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import SubscriptionList from '@/components/subscriptions-list.tsx';
import { Page } from '@/components/page.tsx';
import { DeleteSubscription, ListSubscriptions, Subscription } from '@/subscription.ts';
import { Separator } from '@/components/ui/separator.tsx';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { useMemo } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/subscriptions/')({
  validateSearch: z.object({
    page: z.number().int().min(0).default(0),
    perPage: z.number().int().min(0).default(10),
  }),
  loaderDeps: ({ search: { page, perPage } }) => ({ page, perPage }),
  loader: async ({ deps: { page, perPage } }) => {
    console.log('loader: ', page, perPage);
    return await ListSubscriptions({ page, perPage });
  },
  component: () => <SubscriptionsTable />,
});

function SubscriptionsTable() {
  const subscriptions = Route.useLoaderData();
  const pageable = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate();

  const pages = useMemo(() => {
    return Array.from({ length: Math.ceil(subscriptions.total / pageable.perPage) }, (_, i) => i + 1);
  }, [pageable, subscriptions.total]);

  async function previousPage() {
    if (pageable.page <= 0) return;

    await navigate({
      to: '/subscriptions',
      search: {
        page: pageable.page - 1,
        perPage: pageable.perPage,
      },
    });
  }

  async function nextPage() {
    if (pageable.page + 1 >= Math.ceil(subscriptions.total / pageable.perPage)) return;

    await navigate({
      to: '/subscriptions',
      search: {
        page: pageable.page + 1,
        perPage: pageable.perPage,
      },
    });
  }

  async function jumpToPage(page: number) {
    await navigate({
      to: '/subscriptions',
      search: {
        page: page - 1,
        perPage: pageable.perPage,
      },
    });
  }

  async function onDelete(subscription: Subscription) {
    await DeleteSubscription(subscription);
    await router.invalidate();
  }

  return (
    <Page title="Subscriptions" description="List of all your current subscriptiona">
      <div className="flex flex-col">
        <SubscriptionList subscriptions={subscriptions} onDelete={(subscription) => onDelete(subscription)} />
        <Separator />
        <footer className="sticky bottom-0 p-4 z-10 bg-background">
          <div className="flex flex-row justify-between w-full">
            <div className="text-xs text-muted-foreground content-center">
              Showing{' '}
              <strong>
                {/*TODO: LOL refactor this*/}
                {pageable.page * pageable.perPage + 1}-
                {pageable.page * pageable.perPage + pageable.perPage < subscriptions.total
                  ? pageable.page * pageable.perPage + pageable.perPage
                  : subscriptions.total}
              </strong>{' '}
              of <strong>{subscriptions.total}</strong> subscriptions
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={previousPage} />
                  </PaginationItem>
                  {pages.map((p) => (
                    <PaginationItem>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => jumpToPage(p)}
                        isActive={p - 1 === pageable.page}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={nextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </footer>
      </div>
    </Page>
  );
}
