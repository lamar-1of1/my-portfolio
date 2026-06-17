export function getProjectStatusClass(status: string) {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "new") {
        return "border-emerald-500/25 bg-emerald-500/10 text-emerald-300";
    }

    if (normalizedStatus.includes("progress")) {
        return "border-amber-400/25 bg-amber-400/10 text-amber-200";
    }

    return "border-white/10 bg-white/[0.035] text-zinc-300";
}
