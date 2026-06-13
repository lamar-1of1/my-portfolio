import { redirect } from "next/navigation";

import { cardData } from "@/lib/content/projects";

export default function ProjectsPage() {
    redirect(`/projects/${cardData[0].slug}`);
}
