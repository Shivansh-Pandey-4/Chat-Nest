import { redirect } from "next/navigation";
import { authVerify } from "../../../lib/auth";

export default async function RoomCode({ params }: { params: Promise<{ roomCode: string; }> }) {

    const result = await authVerify();
    const { roomCode } = await params;

    if (!result || !roomCode || roomCode.trim().length !== 6) {
        redirect("/");
    }

    return (
        <div>
            this is a chat room  - {roomCode}
        </div>
    )
}