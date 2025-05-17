//app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Replace getSession with getUser for better security
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect(`/sign-in?redirect=${encodeURIComponent("/dashboard")}`);
    }

    return <DashboardClient user={user} />;
}
