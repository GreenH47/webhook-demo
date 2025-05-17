//app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession(); // single network round-trip ✔

    if (!session) {
        redirect(`/sign-in?redirect=${encodeURIComponent("/dashboard")}`);
    }

    return <DashboardClient user={session.user} />;
}
