import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/features/projects/ProjectDetailPage";
import {
    cardData,
    getProjectBySlug,
} from "@/lib/content/projects";

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return cardData.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project not found | Lamar",
        };
    }

    return {
        title: `${project.title} | Lamar`,
        description: project.subtitle,
        openGraph: {
            title: `${project.title} | Lamar`,
            description: project.subtitle,
            images: [
                {
                    url: project.image,
                    alt: project.title,
                },
            ],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) notFound();

    return (
        <ProjectDetailPage
            project={project}
            otherProjects={cardData.filter((item) => item.slug !== project.slug)}
        />
    );
}
