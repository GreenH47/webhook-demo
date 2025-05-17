//app/dashboard/dashboard-client.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom"
import { submitMessage, type FormState } from "./actions"
import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"

type Props = { user: User }

// Submit button with loading state
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit Message"}
        </Button>
    )
}

export default function DashboardClient({ user }: Props) {
    // Initial form state
    const initialState: FormState = {}

    // Form state using useFormState hook
    const [formState, formAction] = useFormState(submitMessage, initialState)

    // Local form state for controlled inputs
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    // Reset form after successful submission
    useEffect(() => {
        if (formState.success) {
            setName("")
            setMessage("")
        }
    }, [formState.success])

    return (
        <div className="flex flex-col gap-12 py-8 w-full">
            {/* —— Send Message —— */}
            <section className="max-w-md w-full flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Send a message</h2>

                <form action={formAction} className="flex flex-col gap-4">
                    {/* Form-level error message */}
                    {formState.errors?._form && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{formState.errors._form.join(", ")}</AlertDescription>
                        </Alert>
                    )}

                    {/* Success message */}
                    {formState.success && (
                        <Alert className="bg-green-50 text-green-800 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription>{formState.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-invalid={!!formState.errors?.name}
                        />
                        {formState.errors?.name && <p className="text-sm text-red-500">{formState.errors.name.join(", ")}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="body">Message</Label>
                        <textarea
                            id="body"
                            name="body"
                            placeholder="Say something…"
                            className="min-h-[120px] rounded-md border border-input bg-background p-2 text-sm"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            aria-invalid={!!formState.errors?.body}
                        />
                        {formState.errors?.body && <p className="text-sm text-red-500">{formState.errors.body.join(", ")}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="userId">User&nbsp;ID</Label>
                        {/* ✨ Auto-filled from Supabase Auth */}
                        <Input id="userId" name="userId" value={user.id} readOnly className="opacity-60" />
                    </div>

                    <SubmitButton />
                </form>
            </section>

            {/* —— Live Feed —— */}
            <section className="flex flex-col gap-4 w-full">
                <h2 className="text-2xl font-bold">Live messages</h2>
                <div className="border rounded-md p-4 text-sm text-muted-foreground">
                    Nothing to show yet — real-time feed coming soon.
                </div>
            </section>
        </div>
    )
}
