import { ScalesContainer } from "@/components/ui/scales";

export default function ScalesContainerDemo() {
    return (
        <ScalesContainer
            orientation="diagonal"
            size={8}
            containerClassName="h-full w-full overflow-hidden bg-black bord/er-t bord/er-b bo/rder-[#343434]/50 flex items-center justify-center flex-col"
        >
        </ScalesContainer>
    );
}
