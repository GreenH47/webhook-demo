"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

type Props = { user: User };

export default function DashboardClient({ user }: Props) {
    return (
        <div className="flex flex-col gap-12 py-8 w-full">
            {/* —— Send Message —— */}
            <section className="max-w-md w-full flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Send a message</h2>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                            id="message"
                            placeholder="Say something…"
                            className="min-h-[120px] rounded-md border border-input bg-background p-2 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="user-id">User&nbsp;ID</Label>
                        {/* ✨ Auto-filled from Supabase Auth */}
                        <Input
                            id="user-id"
                            value={user.id}
                            readOnly
                            className="opacity-60"
                        />
                    </div>

                    <Button disabled>Submit&nbsp;(coming&nbsp;soon)</Button>
                </div>
            </section>

            {/* —— Live Feed —— */}
            <section className="flex flex-col gap-4 w-full">
                <h2 className="text-2xl font-bold">Live messages</h2>
                <div className="border rounded-md p-4 text-sm text-muted-foreground">
                    Nothing to show yet — real-time feed coming soon.
                </div>
            </section>
        </div>
    );
}
