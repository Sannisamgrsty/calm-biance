import type { AmbientSound } from "../services/ambient-sound";

export type SoundId = AmbientSound["id"]

export type SoundStatus = "playing" | "paused" | "stopped";

export interface SoundState {
    status: SoundStatus;
    volume: number;
    loop: boolean;
}

export type SoundStates = Partial<Record<SoundId, SoundState>>;
