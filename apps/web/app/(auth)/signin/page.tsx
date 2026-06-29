import Button from "@repo/ui/Button";
import SigninForm from "./_components/SigninForm";
import Link from "next/link";


export default function Signin() {

    return (
        <div className=" max-w-4xl mx-auto">

            <div className="mb-12">
                <Link href={"/"}>
                    <Button size="md">Go To Home</Button>
                </Link>
            </div>

            <div className="">
                <SigninForm />
            </div>
        </div>
    )
}