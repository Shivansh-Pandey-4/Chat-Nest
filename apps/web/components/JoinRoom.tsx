"use client"

import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"


export default function JoinRoom() {



    return (
        <div>
            <div className="mt-8">
                <Button onClick={() => alert("hi")} className="w-full text-xl rounded-md py-3" >Create Room</Button>
            </div>

            <div className="mt-5 border p-4 border-gray-500 rounded-md grid grid-cols-4 gap-x-2">

                <Input type="text" placeholder="Enter Room-Code Here" className="focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-500 text-gray-300 bg-gray-700 col-span-3" />

                <Button size="lg" variant="secondary" className="rounded-md col-span-1">Join Room</Button>
            </div>
        </div>
    )
}