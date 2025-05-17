//app/dashboard/action.ts

"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define validation schema
const messageSchema = z.object({
    name: z.string().min(1, "Name is required").max(120, "Name must be 120 characters or less"),
    body: z.string().min(1, "Message is required").max(5000, "Message must be 5000 characters or less"),
    userId: z.string().uuid("Invalid user ID format"),
})

export type FormState = {
    errors?: {
        name?: string[]
        body?: string[]
        userId?: string[]
        _form?: string[]
    }
    success?: boolean
    message?: string
    newMessage?: Message
}

export type Message = {
    id: string
    user_id: string
    name: string
    body: string
    created_at: string
}

export async function submitMessage(prevState: FormState, formData: FormData): Promise<FormState> {
    // Extract form data
    const name = formData.get("name") as string
    const body = formData.get("body") as string
    const userId = formData.get("userId") as string

    // Validate form data
    const validationResult = messageSchema.safeParse({ name, body, userId })

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors,
            success: false,
            message: "Please fix the errors in the form.",
        }
    }

    // Get supabase client
    const supabase = await createClient()

    // Verify the user is authenticated and matches the userId
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
        return {
            errors: {
                _form: ["Unauthorized. User ID doesn't match the authenticated user."],
            },
            success: false,
            message: "Authentication error.",
        }
    }

    // Insert message into database
    const { data, error } = await supabase
        .from("messages")
        .insert({
            name,
            body,
            user_id: userId,
        })
        .select()
        .single()

    if (error) {
        console.error("Error inserting message:", error)
        return {
            errors: {
                _form: [error.message || "Failed to submit message."],
            },
            success: false,
            message: "Database error occurred.",
        }
    }

    // Print submitted success message in console
    console.log("Message submitted successfully:", { name, body, userId })

    // Revalidate the dashboard page to reflect the new message
    revalidatePath("/dashboard")

    return {
        success: true,
        message: "Message submitted successfully!",
        newMessage: data as Message,
    }
}
