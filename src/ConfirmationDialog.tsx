import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ConfirmationDialogProps {
    confirmAction: () => void;
    cancelAction: () => void;
    children: React.ReactNode;
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {props.children}
                {/*<Button variant="outline">test</Button>*/}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={props.cancelAction}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={props.confirmAction}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}