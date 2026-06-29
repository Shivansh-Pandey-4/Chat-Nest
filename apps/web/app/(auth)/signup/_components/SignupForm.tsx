"use client"

import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"
import { signupSchema } from "@repo/validation";
import { useState } from "react"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


interface IData {
    success: boolean;
    msg: string;
    error?: string;
}


export default function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const router = useRouter();

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function signupUser() {
        try {
            setIsLoading(true);

            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(inputValue)
            });

            let data: IData | null = null;

            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            if (!response.ok) {
                if (data && data.success === false)
                    toast.error(data.error || data.msg || "failed to signup");
                else
                    toast.error("failed to signup");
                return;
            }

            if (data && data.success) {
                toast.success(data?.msg || "user signed up successfully");
                router.push("/signin");
                return;
            }

        } catch (error) {
            if (error instanceof TypeError) {
                toast.error(error.message + " :- " + "Check your network connection");
                return;
            }


            toast.error(error instanceof Error ? error.message : "something went wrong");
            return;

        } finally {
            setInputValue({ email: "", password: "", fullName: "" })
            setIsLoading(false);
        }
    }

    function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = signupSchema.safeParse(inputValue);

        if (!result.success) {
            const msg = result.error.issues[0]?.message;
            const path = result.error.issues[0]?.path.toString();

            toast.error(`err: ${msg}, path: ${path}`);
            return;
        }

        signupUser();

    }


    return (
        <div className="border max-w-sm p-3 rounded-md mx-auto">
            <h1 className="text-center text-2xl font-semibold mb-5">Signup Page</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="space-y-4">

                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="fullName">FullName</label>
                        <Input id="fullName" name="fullName" value={inputValue.fullName} onChange={handleOnChange} autoFocus required type="text" placeholder="Enter FullName" />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="email">Email</label>
                        <Input id="email" name="email" value={inputValue.email} required type="email" placeholder="Enter Email" onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="password">Password</label>
                        <Input id="password" name="password" value={inputValue.password} required type="password" placeholder="Enter Password" onChange={handleOnChange} />
                    </div>

                    <Button disabled={isLoading} size="md" className="w-full mt-4" variant="primary">
                        {
                            isLoading ? <span className="flex items-center justify-center"><Loader2 className="animate-spin" /></span> : "Signup"
                        }
                    </Button>

                    <div className="my-2">
                        <h1 className="text-center">Already have an account ? <span className="hover:underline text-blue-400 font-medium cursor-pointer" onClick={() => router.push("/signin")}>Signin</span></h1>
                    </div>

                </div>
            </form>
        </div>
    )
}