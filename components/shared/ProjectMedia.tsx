import { MotionImage } from "@/components/shared/MotionImage";
import type { ProjectItem } from "@/lib/content/projects";

interface ProjectMediaProps {
    project: Pick<ProjectItem, "image" | "title" | "video">;
    className?: string;
    videoClassName?: string;
}

export function ProjectMedia({
    project,
    className,
    videoClassName,
}: ProjectMediaProps) {
    if (project.video) {
        return (
            <video
                aria-label={`${project.title} project preview`}
                autoPlay
                className={videoClassName ?? className}
                loop
                muted
                playsInline
                poster={project.image}
                preload="metadata"
            >
                <source src={project.video} type="video/mp4" />
            </video>
        );
    }

    return (
        <MotionImage
            src={project.image}
            alt={project.title}
            className={className}
        />
    );
}
