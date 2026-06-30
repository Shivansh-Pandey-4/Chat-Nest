"use client"

import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"
import { useState } from "react"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { IData } from "../lib/types";
import { useRouter } from "next/navigation";


export default function JoinRoom() {

    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();


    async function createRoomFn() {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/room/create", {
                method: "POST",
                credentials: "include",
            });

            let data: IData | null = null;

            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            if (!response.ok) {
                if (data && data.success === false) {
                    toast.error(data.error || data.msg);
                    return;
                }
                toast.error("failed to create room");
                return;
            }


            if (data && data.success) {
                toast.success(data.msg);
                router.push(`/room/${data.roomCode}`);
                return;
            }

        } catch (error) {
            if (error instanceof TypeError) {
                toast.error(`${error.message} :- Network error`);
                return;
            }

            toast.error(error instanceof Error ? error.message : "Unknown error occurred");
            return;

        } finally {
            setIsLoading(false);
        }
    }

    async function joinRoomFn(roomCode: string) {

    }

    function handleJoinRoom() {
        if (!inputValue || inputValue.length < 6) {
            toast.error("RoomCode must be 6 characters long");
            return;
        }

        joinRoomFn(inputValue.trim());
    }


    return (
        <div>
            <div className="mt-8">
                <Button disabled={isLoading || isPending} onClick={createRoomFn} className="w-full text-xl rounded-md py-3" >
                    {
                        isLoading ? <span className="flex items-center justify-center gap-x-3"><Loader2 className="animate-spin" /> Creating Room...</span> : "Create Room"
                    }
                </Button>
            </div>

            <div className="mt-5 border p-4 border-gray-500 rounded-md grid grid-cols-4 gap-x-2">

                <Input type="text" placeholder="Enter Room-Code Here" className="focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-500 text-gray-300 bg-gray-700 col-span-3" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                <Button disabled={isLoading || isPending} onClick={handleJoinRoom} size="lg" variant="secondary" className="rounded-md col-span-1">
                    {
                        isPending ? <span className="flex items-center justify-center gap-x-3"><Loader2 className="animate-spin" /> Joining...</span> : "Join Room"
                    }
                </Button>
            </div>
        </div>
    )
}