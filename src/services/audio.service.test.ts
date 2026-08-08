import type { AmbientSound } from "../types/ambient-sound";
import type { HowlPlayerOptions } from "../types/audio.services";
import { describe, expect, it, vi, beforeEach, assert } from "vitest";
import { Howl } from "howler";
import { AudioService } from "./audio.service";

vi.mock("howler", () => {
    return {
        Howl: vi.fn(function () {
            return {
                play: vi.fn(),
                pause: vi.fn(),
                stop: vi.fn(),
                volume: vi.fn(),
                stereo: vi.fn(),
                fade: vi.fn(),
                unload: vi.fn(),
            };
        }),
    };
});

const testSounds: AmbientSound[] = [
    {
        id: "forest-1",
        name: "Forest - Clear",
        src: "forest.mp3",
        typeId: "forest",
    }, {
        id: "forest-2",
        name: "Forest - Spring",
        src: "forest-2.mp3",
        typeId: "forest",
    }, {
        id: "forest-3",
        name: "Forest - Winter",
        src: "forest-3.mp3",
        typeId: "forest",
    },
];

describe("AudioService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should play a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            volume: 0.5,
            loop: true,
        })

        const player = vi.mocked(Howl).mock.results[0].value;

        expect(player.play).toHaveBeenCalled();
    });

    it("should pause a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            volume: 0.5,
            loop: true,
        })

        audioService.pause("forest-1");

        const player = vi.mocked(Howl).mock.results[0].value;

        expect(player.pause).toHaveBeenCalled();
    });

    it("should stop a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.5
        })

        audioService.stop("forest-1")

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.stop).toHaveBeenCalled();
    });

    it("should set volume", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.setVolume("forest-1", 0.7)

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.volume).toHaveBeenCalledWith(0.7);
    });

    it("should not set invalid volume", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.setVolume("forest-1", 1.5)

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.volume).not.toHaveBeenCalled();
    });

    it("should fade a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.fade("forest-1", 0.2, 0.8, 2);

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.fade).toHaveBeenCalledWith(0.2, 0.8, 2000)
    });

    it("should not fade a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.fade("forest-1", 1.5, 0.8, 2)

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.fade).not.toHaveBeenCalled();
    })

    it("should pan a sound", () => {
        const variable = 1;
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.pan("forest-1", variable)

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.stereo).toHaveBeenCalledWith(variable);

    })

    it("should not pan a sound", () => {
        const variable = 2;
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.pan("forest-1", variable)

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.stereo).not.toHaveBeenCalled();

    })

    it("should create a player for each sound", () => {
        const audioService = new AudioService(testSounds);

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);
        audioService.play("forest-2", option);
        audioService.play("forest-3", option);

        const player = vi.mocked(Howl).mock.results.length;

        expect(Howl).toHaveBeenCalledTimes(3);
    })

    it("should play all players", () => {
        const audioService = new AudioService(testSounds);

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);
        audioService.play("forest-2", option);
        audioService.play("forest-3", option);

        const player1 = vi.mocked(Howl).mock.results[0].value;
        const player2 = vi.mocked(Howl).mock.results[1].value;
        const player3 = vi.mocked(Howl).mock.results[2].value;

        player1.play.mockClear();
        player2.play.mockClear();
        player3.play.mockClear();

        audioService.playAll();

        expect(player1.play).toHaveBeenCalled();
        expect(player2.play).toHaveBeenCalled();
        expect(player3.play).toHaveBeenCalled();
    })

    it("should pause all player", () => {
        const audioService = new AudioService(testSounds);

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);
        audioService.play("forest-2", option);
        audioService.play("forest-3", option);

        const player1 = vi.mocked(Howl).mock.results[0].value;
        const player2 = vi.mocked(Howl).mock.results[1].value;
        const player3 = vi.mocked(Howl).mock.results[2].value;

        audioService.pauseAll();

        expect(player1.pause).toHaveBeenCalled();
        expect(player2.pause).toHaveBeenCalled();
        expect(player3.pause).toHaveBeenCalled();
    })

    it("should stop all player", () => {
        const audioService = new AudioService(testSounds);

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);
        audioService.play("forest-2", option);
        audioService.play("forest-3", option);

        const player1 = vi.mocked(Howl).mock.results[0].value;
        const player2 = vi.mocked(Howl).mock.results[1].value;
        const player3 = vi.mocked(Howl).mock.results[2].value;

        audioService.stopAll();

        expect(player1.stop).toHaveBeenCalled();
        expect(player2.stop).toHaveBeenCalled();
        expect(player3.stop).toHaveBeenCalled();
    })

    it("should delete all player", () => {
        const audioService = new AudioService(testSounds);

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);
        audioService.play("forest-2", option);
        audioService.play("forest-3", option);

        const player1 = vi.mocked(Howl).mock.results[0].value;
        const player2 = vi.mocked(Howl).mock.results[1].value;
        const player3 = vi.mocked(Howl).mock.results[2].value;

        audioService.deleteAll();

        expect(player1.unload).toHaveBeenCalled();
        expect(player2.unload).toHaveBeenCalled();
        expect(player3.unload).toHaveBeenCalled();

        audioService.play("forest-1", option);

        expect(Howl).toHaveBeenCalledTimes(4);
    })

    it("should reuse existing player", () => {
        const audioService = new AudioService(testSounds);

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);
        audioService.play("forest-1", option);

        const player = vi.mocked(Howl).mock.results[0].value;

        expect(Howl).toHaveBeenCalledOnce();
        expect(player.play).toHaveBeenCalledTimes(2);
    })

    it("should create a new player after removing existing player", () => {
        const audioService = new AudioService(testSounds)

        const option: HowlPlayerOptions = {
            loop: true,
            volume: 0.2
        }

        audioService.play("forest-1", option);

        const player1 = vi.mocked(Howl).mock.results[0].value;

        audioService.removePlayer("forest-1");

        audioService.play("forest-1", option);

        const player2 = vi.mocked(Howl).mock.results[1].value;

        expect(Howl).toHaveBeenCalledTimes(2);
        expect(player1).not.toBe(player2);
    })

    it("should reuse existing player and ignore new options", () => {
        const audioService = new AudioService(testSounds)


        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        });

        audioService.play("forest-1", {
            loop: true,
            volume: 0.8
        });

        const player = vi.mocked(Howl).mock.results[0].value;

        expect(Howl).toHaveBeenCalledOnce();
        expect(player.play).toHaveBeenCalledTimes(2);
    });

})