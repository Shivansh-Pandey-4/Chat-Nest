import { MessageCircle } from "lucide-react"
import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"


export default function Home() {


  return (
    <div className="py-12">

      <div className="max-w-3xl w-full mx-auto border border-gray-50 py-8 px-5 rounded-md">

        <div className="">
          <h1 className=" flex items-center gap-x-2 text-3xl">  <MessageCircle size={35} className="text-gray-300" />  <span className="text-white"> Real-Time Chat Application </span></h1>

          <p className="text-md font-medium text-gray-500 mt-1">Chats disappers when all user leaves the room</p>
        </div>

        <div className="mt-8">
          <Button className="w-full text-xl rounded-md py-3" >Create Room</Button>
        </div>

        <div className="mt-5 border p-4 border-gray-500 rounded-md grid grid-cols-4 gap-x-2">

          <Input type="text" placeholder="Enter Room-Code Here" className="focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-500 text-gray-300 bg-gray-700 col-span-3" />

          <Button size="lg" variant="secondary" className="rounded-md col-span-1">Join Room</Button>
        </div>
      </div >
    </div>
  )
}