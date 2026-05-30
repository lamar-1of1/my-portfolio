import { ScalesContainer } from "@/components/visual/Scales";

export default function ScalesBackground() {
    return (
        <ScalesContainer
            orientation="diagonal"
            size={8}
            containerClassName="h-full w-full overflow-hidden flex items-center justify-center flex-col"
        />
    );
}
