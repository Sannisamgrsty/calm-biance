import { describe, expect, it, vi, beforeEach } from "vitest";
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

const testSounds = [
    {
        id: "forest-1",
        name: "Forest - Clear",
        src: "forest.mp3",
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

    it("it should fade a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.fade("forest-1", 0.2, 0.8, 2);

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.fade).toHaveBeenCalledWith(0.2, 0.8, 2000)
    });

    it("it should not fade a sound", () => {
        const audioService = new AudioService(testSounds);

        audioService.play("forest-1", {
            loop: true,
            volume: 0.2
        })

        audioService.fade("forest-1", 1.5, 0.8, 2)

        const player = vi.mocked(Howl).mock.results[0].value

        expect(player.fade).not.toHaveBeenCalled();
    })
})