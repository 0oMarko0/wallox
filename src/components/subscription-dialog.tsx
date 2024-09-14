import {Button} from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Controller, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Calendar} from "@/components/ui/calendar.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {DefaultSubscription, Subscription, SubscriptionSchema} from "@/subscription.ts";
import {ReactNode, useEffect, useState} from "react";
import {Category, ListCategories} from "@/category.ts";
import {ListPaymentMethods, PaymentMethods} from "@/payment-methods.ts";
import {Frequency} from "@/frequency.ts";

interface SubscriptionDialogProps {
    children: ReactNode,
    subscription?: Subscription,
    onSubmit: (subscription: Subscription) => void
}

export function SubscriptionDialog(props: SubscriptionDialogProps) {
    const isEditing = props.subscription !== undefined;
    const subscription = isEditing ? props.subscription : DefaultSubscription;

    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
    const form = useForm<z.infer<typeof SubscriptionSchema>>({
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {...subscription},
    })

    useEffect(() => {
        ListCategories().then(categories => {
            setCategories(categories)
            // doesn't work
            DefaultSubscription.category_id = categories[0].id
        });
        ListPaymentMethods().then(paymentMethods =>  {
            setPaymentMethods(paymentMethods)
            // doesn't work
            DefaultSubscription.payment_methods_id = paymentMethods[0].id
        });
    }, [])


    async function onSubmit(value: z.infer<typeof SubscriptionSchema>) {
        props.onSubmit(value as Subscription)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{isEditing ? `Edit ${props.subscription?.name}` : "Add subscription"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Make changes to your subscription here. Click save when you're done."
                            : "Click save when you're done."
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex flex-row space-x-3 w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input className="w-full"  {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-row space-x-3 w-full">
                            <FormField
                                control={form.control}
                                name="payment_every"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Payment every</FormLabel>
                                        <FormControl>
                                            <Input className="w-full" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="payment_frequency"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="invisible">Frequency</FormLabel>
                                        <FormControl className="pt-6">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a frequency"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value={Frequency.WEEK}>Week</SelectItem>
                                                        <SelectItem value={Frequency.MONTH}>Month</SelectItem>
                                                        <SelectItem value={Frequency.YEAR}>Year</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_payment_date"
                                render={({field}) => (
                                    <FormItem className="flex flex-col space-y-4 flex-1">
                                        <FormLabel>Next payment</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Controller
                            control={form.control}
                            name="payment_methods_id"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Payment methods</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue>
                                                    {paymentMethods.find((pm) => pm.id === field.value)?.name || "Select Payment Methods"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {paymentMethods.map((methods) => <SelectItem key={methods.id}
                                                                                                 value={methods.id}>{methods.name}</SelectItem>)}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="category_id"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue>
                                                    {categories.find((category) => category.id === field.value)?.name || "Select Category"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {categories.map((category) => <SelectItem key={category.id}
                                                                                              value={category.id}>{category.name}</SelectItem>)}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paid_by"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Paid by</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="note"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-end">
                            <Button type="submit">{isEditing ? "Save changes" : "Save"}</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
