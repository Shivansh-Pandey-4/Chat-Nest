import { redirect } from "next/navigation";
import { authVerify } from "../../../lib/auth";
import ChatForm from "../../../components/ChatForm";
import CopyRoomText from "../../../components/CopyRoomText";



export default async function RoomCode({ params }: { params: Promise<{ roomCode: string; }> }) {

    const result = await authVerify();
    const { roomCode } = await params;

    if (!result || !result.roomCode || !roomCode || roomCode.trim().length !== 6) {
        redirect("/");
    }



    return (
        <div>
            <div className="border px-4 py-6 rounded-md">
                <section className="flex items-center gap-x-2">
                    <h1>Room no -: <span className="bg-zinc-700 p-1 rounded-md">{result.roomCode}</span> </h1>

                    <CopyRoomText roomCode={result.roomCode} />
                </section>

                <section className="mt-4">
                    <ChatForm data={result} />
                </section>

            </div>
        </div>
    )
}