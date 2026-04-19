import * as React from "react"
import { cn } from "../../lib/utils"

const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
                <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">X</button>
                {children}
            </div>
        </div>
    )
}

const DialogContent = ({ children }) => <div className="mt-4">{children}</div>
const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>
const DialogTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>

export { Dialog, DialogContent, DialogHeader, DialogTitle }
