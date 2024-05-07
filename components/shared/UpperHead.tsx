import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

function UpperHead() {
    const [hidebar, setHidebar] = useState<Boolean>(false)

    return (
        <div className={`w-full mx-auto py-0.5 bg-neutral-100 text-neutral-400 hidden md:block ${hidebar ? 'hidden' : ''}`}>
            <ul className="text-xss flex gap-5 justify-center items-center w-full px-4 text-left lg:text-center lg:px-0 lg:w-[80%] mx-auto">
                <li className="tracking-wide">This website is still under beta version, we are expecting to launch it soon, Stay Connected 🎊</li>
                <li className="bg-neutral-200 px-1 rounded-full">#event #management #system</li>
                <li className="h-3.5 ms-10">
                    <Button variant={"ghost"} className="p-0 m-0 h-0" onClick={() => setHidebar(true)}>
                        <X size={10} />
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default UpperHead