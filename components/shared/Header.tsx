'use client'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import Search from "./Search"
import { ImagePlus, X } from "lucide-react"
import UpperHead from "./UpperHead"
import { useSearchParams } from "next/navigation"
import { removeKeysFromQuery } from "@/lib/utils"
import MobileNavUpdated from "./MobileNavUpdated"
import SearchButtonHome from "./SearchButtonHome"

const Header = () => {

  return (
    <header className="w-full border-b">
      <UpperHead />
      <div className="flex items-center justify-between flex-row w-[80%] mx-auto pt-4 pb-2 md:py-2">
        <Link href="/" className="w-48">
          <Image
            src="/assets/images/logo.svg" width={164} height={48}
            alt="Meet Hub logo"
          />
        </Link>

        <span className="hidden md:inline w-full md:w-8/12">
          <SearchButtonHome />
        </span>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNavUpdated />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
      <div className="block mb-5 md:hidden">
        <SearchButtonHome />
      </div>
      <div className="hidden md:block pt-2 w-[80%] mx-auto">
        <SignedIn>
          <nav className="md:flex-between hidden w-full overflow-hidden overflow-x-auto noscrollbar">
            <NavItems />
          </nav>
        </SignedIn>
      </div>
    </header>
  )
}

export default Header