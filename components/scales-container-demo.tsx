import { ScalesContainer } from "@/components/ui/scales";

export default function ScalesContainerDemo() {
    return (
        <ScalesContainer
            orientation="diagonal"
            size={8}
            containerClassName="h-18 w-full overflow-hidden bg-black border-t border-b border-[#343434]/50 flex items-center justify-center flex-col"
        >
        </ScalesContainer>
    );
}
