import { sounds } from "./constants/sounds";
import type { HowlPlayerOptions } from "./types/audio.services";
import { AudioService } from "./services/audio.service";

const players = new AudioService(sounds);

export default function App() {

  return (
    <div>
      <div>
        <button
          onClick={() => {
            const option: HowlPlayerOptions = {
              volume: 0.5,
              loop: true,
            }
            players.play("piano-1", option);

          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            players.stop("piano-1");
          }}
        >
          Stop
        </button>
      </div>


    </div>
  );
}