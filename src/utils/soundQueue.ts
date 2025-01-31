import { useAppStore } from '../store/app.ts';

class SoundQueue {
  private isPlaying: boolean;
  private queue: string[];

  constructor() {
    this.queue = [];
    this.isPlaying = false;
  }

  enqueue(soundPath: string) {
    if (useAppStore.getState().disableSounds) {
      return;
    }
    this.queue.push(soundPath);
    this.playNext();
  }

  private async playNext() {
    if (this.isPlaying || this.queue.length === 0) {
      return;
    }

    const soundPath = this.queue.shift()!;
    const audio = new Audio(soundPath);
    this.isPlaying = true;

    try {
      await audio.play(); // Wait for the sound to start playing
      await this.waitForSoundToEnd(audio); // Wait until it ends
    } catch (error) {
      console.error(`Error playing sound: ${error}`);
    } finally {
      this.isPlaying = false;
      this.playNext(); // Play the next sound in the queue
    }
  }

  private waitForSoundToEnd(audio: HTMLAudioElement): Promise<void> {
    return new Promise((resolve) => {
      audio.addEventListener('ended', () => resolve(), { once: true });
      audio.addEventListener('error', () => resolve(), { once: true }); // Handle playback errors
    });
  }
}

const soundQueue = new SoundQueue();

export default soundQueue;
