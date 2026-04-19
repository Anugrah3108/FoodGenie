import * as React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-slate-900 border-transparent text-white hover:bg-slate-900/80", className)} {...props} />
    )
}

export { Badge }
