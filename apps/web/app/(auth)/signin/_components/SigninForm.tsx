"use client"

import Button from "@repo/ui/Button"
import Input from "@repo/ui/Input"
import { signinSchema } from "@repo/validation";
import { useState } from "react"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


interface IData {
    success: boolean;
    msg: string;
    error?: string;
}

export default function SigninForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })

    const router = useRouter();

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function signinUser() {
        try {
            setIsLoading(true);

            const response = await fetch("http://localhost:3000/auth/signin", {
                method: "POST",
                credentials: "include",
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
                router.push("/");
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
            setInputValue({ email: "", password: "" })
            setIsLoading(false);
        }
    }

    function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = signinSchema.safeParse(inputValue);

        if (!result.success) {
            const msg = result.error.issues[0]?.message;
            const path = result.error.issues[0]?.path.toString();

            toast.error(`err: ${msg}, path: ${path}`);

            return;
        }

        signinUser();

    }


    return (
        <div className="border max-w-sm p-3 rounded-md mx-auto">
            <h1 className="text-center text-2xl font-semibold mb-3">Signin Page</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="space-y-4">

                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="email">Email</label>
                        <Input autoFocus id="email" name="email" value={inputValue.email} required type="email" placeholder="Enter Email" onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="password">Password</label>
                        <Input id="password" name="password" value={inputValue.password} required type="password" placeholder="Enter Password" onChange={handleOnChange} />
                    </div>

                    <Button disabled={isLoading} size="md" className="w-full mt-3" variant="primary">
                        {
                            isLoading ? <span className="flex items-center justify-center"><Loader2 className="animate-spin" /></span> : "Signin"
                        }
                    </Button>

                    <div className="my-2">
                        <h1 className="text-center">Don't have an account ? <span className="hover:underline text-blue-400 font-medium cursor-pointer" onClick={() => router.push("/signup")}>Signup</span></h1>
                    </div>

                </div>
            </form>
        </div>
    )
}