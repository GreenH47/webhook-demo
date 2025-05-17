//app/(auth-pages)/sign-in/page.tsx
import {signInAction} from "@/app/actions";
import {FormMessage, Message} from "@/components/form-message";
import {SubmitButton} from "@/components/submit-button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";


// ————————————————
// Helper component ↓
// ————————————————
function TestCredentials() {
    return (
        <div className="mt-6 border rounded-md p-4 bg-muted text-sm">
            <p className="font-medium mb-2">Test accounts</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>
                    <span className="font-semibold">greenhuang47@gmail.com</span> / 123456
                </li>
                <li>
                    <span className="font-semibold">huangshixin47@gmail.com</span> / 123456
                </li>
            </ul>
        </div>
    );
}

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return (
        <form className="flex-1 flex flex-col min-w-64">
            <h1 className="text-2xl font-medium">Sign in</h1>
            <p className="text-sm text-foreground">
                Don't have an account?{" "}
                <Link className="text-foreground font-medium underline" href="/sign-up">
                    Sign up
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required/>
                <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        className="text-xs text-foreground underline"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                />
                <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                    Sign in
                </SubmitButton>
                <FormMessage message={searchParams}/>
            </div>
            {/*{process.env.NODE_ENV !== "production" && <TestCredentials />}*/}
            { <TestCredentials/>}


        </form>
    );
}
