import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { useCallback, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { SubscriptionDialog } from '@/components/subscription-dialog.tsx';
import {
  CountSubscriptions,
  CreateOrUpdateSubscription,
  DeleteSubscription,
  ListSubscriptions,
  NextPaymentDate,
  Subscription,
} from '@/subscription.ts';
import { CategoryDialog } from '@/components/category-dialog.tsx';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState({ page: 0, perPage: 10 });
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    CountSubscriptions().then((c) => setCount(c === null ? 0 : c));
    ListSubscriptions(page).then((subscriptions) => {
      setSubscriptions(subscriptions);
      setIsLoading(false);
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

  const createOrUpdate = useCallback(
    async (subscription: Subscription) => {
      await CreateOrUpdateSubscription(subscription);
      setSubscriptions(await ListSubscriptions(page));
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {isLoading ?? <div>TEST</div>}
      <div className="ml-auto flex items-center gap-2">
        <CategoryDialog>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Edit Categories</span>
          </Button>
        </CategoryDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
        </Button>
        <SubscriptionDialog onSubmit={createOrUpdate}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
          </Button>
        </SubscriptionDialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Manage your subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
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
            <TableBody className="overflow-y-scroll w-full max-h-96">
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
                        <SubscriptionDialog subscription={subscription} onSubmit={createOrUpdate}>
                          <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                            Edit
                          </DropdownMenuItem>
                        </SubscriptionDialog>
                        <ConfirmationDialog
                          toDelete="Subscription"
                          confirmAction={() => deleteSubscription(subscription)}>
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
        </CardContent>
        <CardFooter>
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
        </CardFooter>
      </Card>
    </main>
  );
}
