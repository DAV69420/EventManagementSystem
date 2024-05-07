import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import QRCode from "./QRCode"
import { IEvent } from "@/lib/database/models/event.model"
import { getOrdersByEvent } from "@/lib/actions/order.actions"

async function showQRButton({ eventId, setext, oirder }: {
    eventId: string, setext:
    {
        data: any;
        totalPages: number;
    } | undefined,
    oirder: number
}) {
    const qrcodeee = setext?.data[oirder]._id
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={'outline'}>Show Ticket</Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="mt-5">
                        <DrawerTitle>Ticket QR Code</DrawerTitle>
                        <DrawerDescription>Please show this QR to the security guard for seamless entry</DrawerDescription>
                        <div className="w-full mx-auto">
                            <QRCode qrtext={qrcodeee} />

                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default showQRButton