import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {supabase} from "@/supabaseClient.ts";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {File, ListFilter, MoreHorizontal, PlusCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";

interface Subscription {
    id: bigint;
    name: string;
    frequency_payment: string;
    next_payment_date: Date;
    price: number;
    created_at: Date;
}

export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState<Subscription[] | null>([])

    useEffect(() => {
        getSubscriptions().then(subscription => setSubscriptions(subscription));
    }, [])

    async function getSubscriptions() {
        const {data, error} = await supabase.from("subscriptions").select().returns<Subscription[]>();

        console.log(data)
        if (error) {
            alert(error.message)
        }

        return data;
    }

    async function deleteSubscription(id: bigint) {
        console.log(id)
        supabase.from("subscriptions").delete().eq("id", id)
    }

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ListFilter className="h-3.5 w-3.5"/>
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuCheckboxItem checked>
                            Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                            Archived
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Subscriptions</CardTitle>
                    <CardDescription>Manage your subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Next Payment Date
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Price
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableHeader>
                        <TableBody>
                            {subscriptions?.map((subscription: Subscription) => (
                                <TableRow key={subscription.id}>
                                    <TableCell className="font-medium">
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {subscription.name}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Badge variant="outline">{subscription.frequency_payment}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {subscription.next_payment_date.toString()}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        ${subscription.price}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer" onClick={() => deleteSubscription(subscription.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "} subscriptions
                    </div>
                </CardFooter>
            </Card>
        </main>
    )
}