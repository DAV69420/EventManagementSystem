import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "../ui/separator"
import NavItems from "./NavItems"


const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white z-20 pt-5 navShadow">
      <NavItems size={4} />
    </nav>
  )
}

export default MobileNav