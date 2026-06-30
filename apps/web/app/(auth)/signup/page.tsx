import Button from "@repo/ui/Button";
import SignupForm from "./_components/SignupForm";
import Link from "next/link";



export default function Signup() {


    return (
        <div className="pb-8">
            <div className="mb-12">
                <Link href={"/"}>
                    <Button size="md">Go To Home</Button>
                </Link>
            </div>

            <div className="">
                <SignupForm />
            </div>
        </div>
    )
}