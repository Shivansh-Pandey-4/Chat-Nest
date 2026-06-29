import { MessageCircle } from "lucide-react"
import JoinRoom from "../components/JoinRoom"


export default function Home() {


  return (
    <div className="py-12">

      <div className="max-w-3xl w-full mx-auto border border-gray-50 py-8 px-5 rounded-md">

        <div className="">
          <h1 className=" flex items-center gap-x-2 text-3xl">  <MessageCircle size={35} className="text-gray-300" />  <span className="text-white"> Real-Time Chat Application </span></h1>

          <p className="text-md font-medium text-gray-500 mt-1">Chats disappers when all user leaves the room</p>
        </div>

        <JoinRoom />

      </div >
    </div>
  )
}