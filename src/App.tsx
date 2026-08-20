import { Volume } from "lucide-react";
import { sounds } from "./constants/sounds";
import { useAudio } from "./hooks/use-audio"
import type { AmbientSound } from "./types/services/ambient-sound";
import type { SoundState } from "./types/state/sound.state";

type SoundCardProps = {
  sound: AmbientSound;
  isAdded: boolean;
  soundState: SoundState | undefined;
  onAdd: () => void;
  onRemove: () => void;
  onTogglePlay: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
};

function SoundCard({
  sound,
  isAdded,
  soundState,
  onAdd,
  onRemove,
  onTogglePlay,
  onStop,
  onVolumeChange,
}: SoundCardProps) {
  const status = soundState?.status;
  const volume = soundState?.volume;

  return (
    <div>
      <h3>{sound.name}</h3>
      <h2>{status ?? "Not Added"}</h2>

      {isAdded ? (
        <button onClick={onRemove}>
          Remove
        </button>
      ) : (
        <button onClick={onAdd}>
          Add
        </button>
      )}

      {
        status === "playing" ? (
          <>
            <button onClick={onTogglePlay}>
              Pause
            </button>

            <button onClick={onStop}>
              Stop
            </button>
          </>
        ) : status === "paused" || status === "stopped" ? (
          <>
            <button onClick={onTogglePlay}>
              Play
            </button>

            {status === "paused" && (
              <button onClick={onStop}>
                Stop
              </button>
            )}
          </>
        ) : null
      }

      {isAdded && (
        <div>
          <Volume />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume ?? 0}
            onChange={(event) => {
              onVolumeChange(Number(event.target.value));
            }}
          />

          <span>{Math.round((volume ?? 0) * 100)}%</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const {
    addedSounds,
    soundStates,
    addSound,
    removeSound,
    stopSound,
    togglePlay,
    setVolume
  } = useAudio();

  return (
    <div>
      {sounds.map((sound) => (
        <SoundCard
          key={sound.id}
          sound={sound}
          isAdded={addedSounds.includes(sound.id)}
          soundState={soundStates[sound.id]}
          onAdd={() => addSound(sound.id)}
          onRemove={() => removeSound(sound.id)}
          onTogglePlay={() => togglePlay(sound.id)}
          onStop={() => stopSound(sound.id)}
          onVolumeChange={(volume) => setVolume(sound.id, volume)}
        />
      ))}
    </div>
  );
}