"use client"

import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"
import { useState, useEffect } from "react"

interface IProps {
    data: {
        userFullName: string;
        roomCode?: string;
        roomId?: number;
    }
}


export default function ChatForm(props: IProps) {

    const [inputValue, setInputValue] = useState("");


    useEffect(() => {

    }, []);


    return (
        <div className="flex gap-x-2">

            <Input type="text" className="flex-1 bg-zinc-700" placeholder="type message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

            <Button size="md" variant="secondary">Send Message</Button>
        </div>
    )
}