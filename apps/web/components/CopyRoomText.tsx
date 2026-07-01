"use client"

import Button from "@repo/ui/Button"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner";



export default function CopyRoomText(props: { roomCode: string; }) {

    function handleBtn() {
        navigator.clipboard.writeText(props.roomCode);
        toast.success("copied!");
        return;
    }

    return (
        <div className="hover:bg-gray-800 p-1 rounded-md">
            <CopyIcon className="cursor-pointer" onClick={handleBtn} size={18} />
        </div>
    )
}