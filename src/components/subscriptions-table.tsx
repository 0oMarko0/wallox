import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { useCallback, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import {
  CountSubscriptions,
  DeleteSubscription,
  ListSubscriptions,
  NextPaymentDate,
  Subscription,
} from '@/subscription.ts';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator.tsx';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>([]);
  const [page, setPage] = useState({ page: 0, perPage: 25 });
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    CountSubscriptions().then((c) => setCount(c === null ? 0 : c));
    ListSubscriptions(page).then((subscriptions) => {
      setSubscriptions(subscriptions);
    });
  }, [page]);

  const deleteSubscription = useCallback(
    async (subscription: Subscription) => {
      if (subscription.id !== undefined) {
        await DeleteSubscription(subscription);
        setSubscriptions(await ListSubscriptions(page));
      }
    },
    [page],
  );

  const pages = Array.from({ length: Math.ceil(count / page.perPage) }, (_, i) => i + 1);

  function previousPage() {
    setPage((prevState) => {
      if (prevState.page <= 0) {
        return prevState;
      }

      return {
        ...prevState,
        page: prevState.page - 1,
      };
    });
  }

  function nextPage() {
    setPage((prevState) => {
      if (prevState.page + 1 < Math.ceil(count / page.perPage)) {
        return {
          ...prevState,
          page: prevState.page + 1,
        };
      }

      return prevState;
    });
  }

  function jumpToPage(page: number) {
    setPage((prevState) => {
      return {
        ...prevState,
        page: page - 1,
      };
    });
  }

  return (
    <div className="flex flex-col">
      <Table className="w-full grow">
        <TableHeader>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead className="hidden md:table-cell">Next Payment Date</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableHeader>
        <TableBody className="w-full">
          {subscriptions?.map((subscription: Subscription) => (
            <TableRow key={subscription.id}>
              <TableCell className="font-medium"></TableCell>
              <TableCell className="font-medium">{subscription.name}</TableCell>
              <TableCell className="font-medium">
                <Badge variant="outline">{subscription.payment_frequency}</Badge>
              </TableCell>
              <TableCell className="font-medium">{NextPaymentDate(subscription)?.toDateString()}</TableCell>
              <TableCell className="font-medium">${subscription.price}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link to="/subscriptions/$subscriptionId" params={{ subscriptionId: subscription.id }}>
                      <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <ConfirmationDialog toDelete="Subscription" confirmAction={() => deleteSubscription(subscription)}>
                      <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                        Delete
                      </DropdownMenuItem>
                    </ConfirmationDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Separator />

      <footer className="sticky bottom-0 p-4 z-10 bg-background">
        <div className="flex flex-row justify-between w-full">
          <div className="text-xs text-muted-foreground content-center">
            Showing{' '}
            <strong>
              {page.page * page.perPage + 1}-{page.page * page.perPage + page.perPage}
            </strong>{' '}
            of <strong>{count}</strong> subscriptions
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
                      isActive={p - 1 === page.page}>
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
  );
}
