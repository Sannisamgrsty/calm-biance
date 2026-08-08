import type { SoundType } from "../types/ambient-sound";
import { CloudRain, Flame, Keyboard, Piano, TrainFront, Trees } from "lucide-react";

export const soundTypes: SoundType[] = [
    {
        id: "fireplace",
        name: "Fireplace",
        icon: Flame,
    },
    {
        id: "forest",
        name: "Forest",
        icon: Trees,
    },
    {
        id: "piano",
        name: "Piano",
        icon: Piano,
    },
    {
        id: "rain",
        name: "Rain",
        icon: CloudRain,
    },
    {
        id: "train",
        name: "Train",
        icon: TrainFront,
    },
    {
        id: "typing",
        name: "Typing",
        icon: Keyboard,
    },
]