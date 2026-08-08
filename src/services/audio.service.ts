import { Howl } from "howler";
import type { HowlOptions } from "howler";
import type { AmbientSound } from "../types/ambient-sound";
import type { HowlPlayerOptions } from "../types/audio.services";

export class AudioService {
    private sounds: AmbientSound[];

    private players = new Map<AmbientSound["id"], Howl>();

    constructor(sounds: AmbientSound[]) {
        this.sounds = sounds;
    }

    private isValidVolume(
        volume: number
    ): boolean {
        return volume >= 0 && volume <= 1;
    }

    private getSound(id: AmbientSound["id"]): AmbientSound {

        const sound = this.sounds.find((sound) => sound.id === id);

        if (!sound) {
            throw new Error(`Sound with id "${id}" was not found.`);
        }

        return sound;

    }

    private createPlayer(
        sound: AmbientSound,
        options: HowlPlayerOptions,
    ): Howl {

        if (!this.isValidVolume(options.volume)) {
            throw new Error(`Invalid volume: ${options.volume}`);
        }

        const howlOptions: HowlOptions = {
            src: sound.src,
            volume: options.volume,
            loop: options.loop,

            onloaderror(id: number, err: unknown) {
                console.error("Load Error:", id, err);
            },

            onplayerror(id: number, err: unknown) {
                console.error("Play Error:", id, err);
            }
        };

        return new Howl(howlOptions);
    }

    // Fungsi untuk mengambil player yang sudah ada 
    private getExistingPlayer(
        id: AmbientSound["id"]
    ): Howl | undefined {

        return this.players.get(id);

    }

    // Fungsi untuk menambahkan player dan mengecek ketersediaan player
    private getOrCreatePlayer(
        id: AmbientSound["id"],
        options: HowlPlayerOptions,
    ): Howl {
        // Cek apakah player sudah ada dalam players
        let player = this.getExistingPlayer(id);

        // Jika ada, maka return player
        if (player) {
            console.log("Player sudah ada dalam players.")
            return player;
        }

        // Jika tidak ada maka create new player dan assign ke players
        // Get ambient sound
        const sound: AmbientSound = this.getSound(id);

        // Create player
        player = this.createPlayer(sound, options);
        this.players.set(id, player);
        return player;
    }

    // Memainkan musik
    play(
        id: AmbientSound["id"],
        options: HowlPlayerOptions,
    ): void {
        const player = this.getOrCreatePlayer(id, options);
        player.play();
    }

    // Menghentikan musik
    pause(
        id: AmbientSound["id"]
    ): void {
        const player = this.getExistingPlayer(id);

        if (player) {
            player.pause();
        }
    }

    // Stop musik
    stop(
        id: AmbientSound["id"]
    ): void {
        const player = this.getExistingPlayer(id);

        if (player) {
            player.stop();
        }
    }

    // Hapus dari players
    removePlayer(
        id: AmbientSound["id"]
    ): void {
        // Ambil player jika ada
        const player = this.getExistingPlayer(id);

        if (player) {
            player.unload();
            this.players.delete(id);
        }
    }

    // Set Volume
    setVolume(
        id: AmbientSound["id"],
        volume: number
    ): void {
        if (this.isValidVolume(volume)) {
            const player = this.getExistingPlayer(id);

            if (player) {
                player.volume(volume);
            }
        } else {
            console.error("SetVolume : Please input 0.0 - 1.0")
        }
    }

    //Set Fade
    fade(
        id: AmbientSound["id"],
        volumeStart: number,
        volumeEnd: number,
        seconds: number,
    ): void {
        if (this.isValidVolume(volumeStart) && this.isValidVolume(volumeEnd)) {
            const player = this.getExistingPlayer(id);

            if (player) {
                const milliseconds = seconds * 1000;

                player.fade(volumeStart, volumeEnd, milliseconds)
            }
        } else {
            console.error("fade : Please input 0.0 - 1.0 to volumeStart and volumeEnd.")
        }
    }

    // Pan
    pan(
        id: AmbientSound["id"],
        pan: number
    ): void {
        if (pan >= -1 && pan <= 1) {
            const player = this.getExistingPlayer(id);

            if (player) {
                player.stereo(pan);
            }
        } else {
            console.error("pan: Please input a number from -1 to 1.")
        }
    }

    // Mainkan semua pada player
    playAll(): void {
        this.players.forEach((player) => player.play())
    }

    // Pause semua pada player
    pauseAll(): void {
        this.players.forEach((player) => player.pause())
    }

    // Stop semua pada player
    stopAll(): void {
        this.players.forEach((player) => player.stop())
    }

    // Menghapus semua pada play
    deleteAll(): void {
        this.players.forEach((player) => {
            player.unload();
        });

        this.players.clear();
    }

}