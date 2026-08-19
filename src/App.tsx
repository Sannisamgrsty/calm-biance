import { useState } from "react";
import { AudioService } from "./services/audio.service";
import { sounds } from "./constants/sounds";
import type { SoundId, SoundStates } from "./types/state/sound.state";

const DEFAULT_VOLUME = 0.5;
const DEFAULT_LOOP = true;

const audioService = new AudioService(sounds);

export default function App() {
  const [addedSounds, setAddedSounds] = useState<SoundId[]>([]);
  const [soundStates, setSoundStates] = useState<SoundStates>({});

  function hasSound(id: SoundId): boolean {
    return addedSounds.includes(id);
  }

  function addSound(id: SoundId) {
    // Cek apakah sound sudah ada dalam added sound
    if (hasSound(id)) {
      return;
    }

    // Add sound to added sound
    setAddedSounds((prev) => [...prev, id]);

    // Add sound state
    setSoundStates((prev) => ({
      ...prev,
      [id]: {
        status: "playing",
        volume: DEFAULT_VOLUME,
        loop: DEFAULT_LOOP,
      }
    }))

    // Bunyikan howler
    audioService.play(id, {
      volume: DEFAULT_VOLUME,
      loop: DEFAULT_LOOP,
    })
  }

  function removeSound(id: SoundId) {
    // Cek apakah sound sudah teradd
    if (!hasSound(id)) {
      return;
    }

    // Remove sound dari added sound
    setAddedSounds((prev =>
      prev.filter((soundId) => soundId !== id)
    ));

    // Remove sound dari sound state
    setSoundStates((prev) => {
      const { [id]: removed, ...remaining } = prev;

      return remaining;
    });

    audioService.removePlayer(id);

  }

  function pauseSound(id: SoundId) {
    // Cek apa
    if (!hasSound(id)) {
      return;
    }

    // Audio service pause
    audioService.pause(id);

    // Change status to pause
    setSoundStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: "paused",
      },
    }))
  }

  function playSound(id: SoundId) {
    if (!hasSound(id)) {
      return;
    }

    audioService.play(id, {
      volume: soundStates[id].volume,
      loop: soundStates[id].loop,
    });

    setSoundStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: "playing",
      },
    }));
  }

  return (
    <div></div>
  )
}