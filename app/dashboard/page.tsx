// app/dashboard/page.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-12 py-8 w-full">
            {/* ——————————————————— */}
            {/* Send Message (stub)  */}
            {/* ——————————————————— */}
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
                        <Input
                            id="user-id"
                            placeholder="(auto-generated)"
                            disabled
                            className="opacity-60"
                        />
                    </div>

                    <Button disabled>Submit (coming soon)</Button>
                </div>
            </section>

            {/* ——————————————————— */}
            {/* Live feed placeholder  */}
            {/* ——————————————————— */}
            <section className="flex flex-col gap-4 w-full">
                <h2 className="text-2xl font-bold">Live messages</h2>
                <div className="border rounded-md p-4 text-sm text-muted-foreground">
                    Nothing to show yet — real-time feed coming soon.
                </div>
            </section>
        </div>
    );
}
