import type { ImgHTMLAttributes } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
    default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img {...props} alt={props.alt ?? ""} />
    ),
}));
