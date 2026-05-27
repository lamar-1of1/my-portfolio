import { ScalesContainer } from "@/components/ui/scales";

export default function ScalesContainerDemo() {
    return (
        <ScalesContainer
            orientation="diagonal"
            size={8}
            containerClassName="h-full w-full overflow-hidden flex items-center justify-center flex-col"
        />
    );
}
