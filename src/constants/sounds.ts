import type { AmbientSound } from "../types/ambient-sound";
import firePlaceSound from "../assets/fireplace/fire-place.ogg";
import clearForest from "../assets/forest/clear-forest.ogg";
import summerForest from "../assets/forest/summer-forest.ogg";
import windyForest from "../assets/forest/windy-forest.ogg";
import monolitPiano from "../assets/piano/monolit-piano.ogg";
import loopsPiano from "../assets/piano/piano-loops.ogg";
import gentleRain from "../assets/rain/gentle-rain.ogg";
import heavyRain from "../assets/rain/heavy-rain.ogg";
import lightRain from "../assets/rain/light-rain.ogg";
import superHeavyRain from "../assets/rain/super-heavy-rain.ogg";
import trainSound from "../assets/train/train-passing.ogg";
import typingSound from "../assets/typing/typing-sound.ogg";

export const sounds: AmbientSound[] = [
    {
        id: "fireplace-1",
        name: "Fireplace - 1",
        src: firePlaceSound,
        typeId: "fireplace"
    },
    {
        id: "forest-1",
        name: "Forest - Clear",
        src: clearForest,
        typeId: "forest",
    },
    {
        id: "forest-2",
        name: "Forest - Summer",
        src: summerForest,
        typeId: "forest",
    },
    {
        id: "forest-3",
        name: "Forest - Windy",
        src: windyForest,
        typeId: "forest",
    },
    {
        id: "piano-1",
        name: "Piano - Monolit",
        src: monolitPiano,
        typeId: "piano",
    },
    {
        id: "piano-2",
        name: "Piano - Loops",
        src: loopsPiano,
        typeId: "piano",
    },
    {
        id: "rain-1",
        name: "Rain - Gentle",
        src: gentleRain,
        typeId: "rain",
    },
    {
        id: "rain-2",
        name: "Rain - Light",
        src: lightRain,
        typeId: "rain",
    },
    {
        id: "rain-3",
        name: "Rain - Heavy",
        src: heavyRain,
        typeId: "rain",
    },
    {
        id: "rain-4",
        name: "Rain - Super Heavy",
        src: superHeavyRain,
        typeId: "rain",
    },
    {
        id: "train-1",
        name: "Train - on the Train",
        src: trainSound,
        typeId: "train",
    },
    {
        id: "typing-1",
        name: "Typing - Keyboard Typing",
        src: typingSound,
        typeId: "typing",
    },
]