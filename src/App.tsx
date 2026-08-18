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

  function addSound(id: SoundId) {
    // Cek apakah sound sudah ada dalam added sound
    if (addedSounds.includes(id)) {
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
    if (
      !addedSounds.includes(id) &&
      !Object.keys(soundStates).includes(id)
    ) {
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

  }

  return (
    <div></div>
  )
}