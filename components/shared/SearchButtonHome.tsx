'use client'

import Link from "next/link"
import Search from "./Search"
import { ImagePlus } from "lucide-react"
import { useSearchParams } from "next/navigation"

function SearchButtonHome() {
    const searchParams = useSearchParams()
    const category = searchParams.get("category") ?? ''
    return (
        <div className="px-8 w-full flex items-center justify-center gap-4">
            <Search placeholder={`Search for events${category && ' in ' + category}...`} />
            <Link href="/events/create" title="Create Events" className="hidden md:block">
                <ImagePlus size={24} className="text-neutral-600" />
            </Link>
        </div>
    )
}

export default SearchButtonHome