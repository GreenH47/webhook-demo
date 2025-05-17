//app/dashboard/page.tsx
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
    const supabase = await createClient()

    // Get authenticated user using getUser() for better security
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        redirect(`/sign-in?redirect=${encodeURIComponent("/dashboard")}`)
    }

    // Fetch the latest 3 messages for this user
    const { data: messages, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3)

    if (messagesError) {
        console.error("Error fetching messages:", messagesError)
    }

    return <DashboardClient user={user} initialMessages={messages || []} />
}
