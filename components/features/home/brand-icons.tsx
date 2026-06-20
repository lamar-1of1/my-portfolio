import type { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import {
    faFigma,
    faNodeJs,
    faTailwindCss,
    faTypescript,
} from "@fortawesome/free-brands-svg-icons";

type BrandIconProps = {
    className?: string;
    size?: number | string;
};

function BrandIcon({
    className,
    icon,
    size = 16,
}: BrandIconProps & { icon: IconDefinition }) {
    const dimension = typeof size === "number" ? `${size}px` : size;
    const style: CSSProperties = {
        height: dimension,
        width: dimension,
    };

    return (
        <span className={className} style={style}>
            <FontAwesomeIcon className="h-full w-full" icon={icon} />
        </span>
    );
}

export function FigmaIcon(props: BrandIconProps) {
    return <BrandIcon {...props} icon={faFigma} />;
}

export function NextJsIcon({
    className,
    size = 16,
}: BrandIconProps) {
    const dimension = typeof size === "number" ? `${size}px` : size;
    const style: CSSProperties = {
        height: dimension,
        width: dimension,
    };

    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="currentColor"
            style={style}
            viewBox="0 0 24 24"
        >
            <path d="M18.665 21.978A11.944 11.944 0 0 1 12 24C5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.6h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
        </svg>
    );
}

export function NodeJsIcon(props: BrandIconProps) {
    return <BrandIcon {...props} icon={faNodeJs} />;
}

export function TailwindCssIcon(props: BrandIconProps) {
    return <BrandIcon {...props} icon={faTailwindCss} />;
}

export function TypeScriptIcon(props: BrandIconProps) {
    return <BrandIcon {...props} icon={faTypescript} />;
}
