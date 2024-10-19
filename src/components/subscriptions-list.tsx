import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
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
import { NextPaymentDate, Subscription } from '@/subscription.ts';
import { Link } from '@tanstack/react-router';
import { IPageable } from '@/IPage.ts';
import PaymentMethods from '@/components/payments-logo.tsx';
interface SubscriptionsTableProps {
  subscriptions: IPageable<Subscription>;
  onDelete: (subscription: Subscription) => void;
}

export default function SubscriptionList(props: SubscriptionsTableProps) {
  console.log(props.subscriptions);
  return (
    <Table className="w-full grow">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead className="hidden md:table-cell">Next Payment Date</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {props.subscriptions.items.map((subscription: Subscription) => (
          <TableRow key={subscription.id}>
            <TableCell className="font-medium">
              {' '}
              {subscription.files ? (
                <img src={subscription.files.file_path} alt="Logo" className="object-cover" />
              ) : null}
            </TableCell>
            <TableCell className="font-medium">{subscription.name}</TableCell>
            <TableCell className="font-medium">
              <Badge variant="outline">{subscription.payment_frequency}</Badge>
            </TableCell>
            <TableCell className="font-medium">{NextPaymentDate(subscription)?.toDateString()}</TableCell>
            <TableCell className="font-medium">
              {subscription.categories ? <Badge>{subscription.categories.name}</Badge> : null}
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex flex-row items-center h-full space-x-2">
                <PaymentMethods.money className="h-6" />
                <span>${subscription.price}</span>
              </div>
            </TableCell>
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
                  <Link to="/subscriptions/$subscriptionId" params={{ subscriptionId: subscription.id as string }}>
                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <ConfirmationDialog toDelete="Subscription" confirmAction={() => props.onDelete(subscription)}>
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
  );
}
