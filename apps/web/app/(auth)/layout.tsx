import { authVerify } from "../../lib/auth";
import { redirect } from "next/navigation";


export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    const result = await authVerify();


    if (result) {
        return redirect("/");
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}