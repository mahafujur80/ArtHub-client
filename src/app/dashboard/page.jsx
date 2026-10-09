import { getServerSession } from "@/lib/server/getServerSession";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getServerSession();

    if (!user) {
        redirect("/login");
    }

    if (user.role === "artist") {
        redirect("/dashboard/artist");
    } else if (user.role === "admin") {
        redirect("/dashboard/admin");
    } else {
        redirect("/dashboard/buyer");
    }
}
