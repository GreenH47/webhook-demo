//app/dashboard/dashboard-client.tsx

"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom"
import { submitMessage, type FormState, type Message } from "./actions"
import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import type { User } from "@supabase/supabase-js"

type Props = {
    user: User
    initialMessages: Message[]
}

// Submit button with loading state
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit Message"}
        </Button>
    )
}

// Format date to a readable format
function formatDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

// Message component
function MessageCard({ message }: { message: Message }) {
    return (
        <div className="border rounded-md p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{message.name}</h3>
                <span className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
                    {formatDate(message.created_at)}
        </span>
            </div>
            <p className="text-sm">{message.body}</p>
        </div>
    )
}

export default function DashboardClient({ user, initialMessages }: Props) {
    // Initial form state
    const initialState: FormState = {}

    // Form state using useFormState hook
    const [formState, formAction] = useFormState(submitMessage, initialState)

    // Local form state for controlled inputs
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    // State for messages
    const [messages, setMessages] = useState<Message[]>(initialMessages)

    // Update messages when a new message is submitted
    useEffect(() => {
        if (formState.success && formState.newMessage) {
            setMessages((prev) => [formState.newMessage!, ...prev.slice(0, 2)])
        }
    }, [formState.success, formState.newMessage])

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
                <h2 className="text-2xl font-bold">Live messages (latest 3 max)</h2>

                {messages.length > 0 ? (
                    <div className="w-full">
                        {messages.map((msg) => (
                            <MessageCard key={msg.id} message={msg} />
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-md p-4 text-sm text-muted-foreground">
                        No messages yet. Send your first message above!
                    </div>
                )}
            </section>
        </div>
    )
}
