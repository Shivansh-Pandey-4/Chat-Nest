"use client"

import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"



interface IProps {
    data: {
        userFullName: string;
        roomCode?: string;
        roomId?: number;
    }
}

interface IChat {
    fromUser: string;
    msg: string;
}


export default function ChatForm(props: IProps) {

    const [inputValue, setInputValue] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [allChats, setAllChats] = useState<IChat[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { roomCode } = props.data;

    function handleSendBtn(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!inputValue || !inputValue.trim()) {
            toast.error("cannot send empty message");
            return;
        }

        socket?.send(JSON.stringify({
            type: "chat",
            payload: {
                msg: inputValue.trim()
            }
        }))

        setAllChats(prev => ([...prev, { fromUser: "me", msg: inputValue.trim() }]));
        setInputValue("");
    }


    useEffect(() => {
        const ws = new WebSocket(`http://localhost:3000?roomCode=${roomCode}`);
        setSocket(ws);

        ws.onopen = (event) => {
            setTimeout(() => {

                ws.send(JSON.stringify({
                    type: "join",
                    payload: {
                        roomCode
                    }
                }));

            }, 2000);
        }

        ws.onmessage = (event) => {
            const parsedMsg = JSON.parse(event.data);
            console.log("parsedMsg : ", parsedMsg);

            if (parsedMsg.type === "user_joined") {
                toast.success(parsedMsg.payload.msg);
                return;
            }

            if (parsedMsg.type === "chat") {
                const msg = parsedMsg.payload.msg;
                const fromUser = parsedMsg.payload.fromUser;

                setAllChats(prev => ([...prev, { msg, fromUser }]));
                return;
            }

        }

        ws.onclose = (event) => {
            console.log("closed event: ", event);
        }

        ws.onerror = (event) => {
            console.log("event error: ", event);
        }


        return () => {
            socket?.close();
        }

    }, []);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        })

    }, [allChats]);


    return (
        <div className="">
            <section className="border border-zinc-300 rounded-md h-80  overflow-y-scroll">
                {
                    allChats.length === 0 ? <h1 className="mt-5 text-center">Currently No Chats are presents</h1> : <div className="p-2 flex flex-col">
                        {
                            allChats.map((chat, index) => {
                                if (chat.fromUser === "me") {
                                    return (
                                        <div key={index} className="border self-start bg-gray-500 text-white px-2 mb-2 flex flex-col">
                                            <p className="wrap-break-word max-w-xs">{chat.msg}</p>
                                            <p className="text-xs self-end">From - {chat.fromUser}</p>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div key={index} className="border self-end bg-green-600 text-white px-2 mb-2 flex flex-col">
                                            <p className="wrap-break-word max-w-xs">{chat.msg}</p>
                                            <p className="text-xs self-end">From - {chat.fromUser}</p>
                                        </div>
                                    )
                                }
                            })
                        }

                        <div ref={bottomRef}></div>
                    </div>
                }
            </section>

            <section >
                <form onSubmit={handleSendBtn} className="flex gap-x-2 mt-4">
                    <Input type="text" className="flex-1 bg-zinc-700" placeholder="type message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                    <Button size="md" variant="secondary">Send Message</Button>
                </form>
            </section>
        </div>
    )
}