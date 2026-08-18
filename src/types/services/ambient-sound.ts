import type { LucideIcon } from "lucide-react";

export interface AmbientSound {
    id: string;
    name: string;
    src: string;
    typeId: SoundType["id"];
}

export interface SoundType {
    id: string;
    name: string;
    icon: LucideIcon
}