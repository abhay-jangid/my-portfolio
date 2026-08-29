/**
 * Web Audio Synthesis & BGM Engine (audioEngine.ts)
 * --------------------------------------------------------------------------
 * Audio player managing continuous lofi background track
 * ("/audio/crossing-field-lofi.mp3") along with micro-interaction sound effects.
 */

class AudioEngine {
  private bgm: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isInitialized: boolean = false;
  private isMuted: boolean = false;
  private isEnabled: boolean = true;

  constructor() {
    // Lazy initialization on client side
    if (typeof window !== "undefined") {
      try {
        this.bgm = new Audio("/audio/crossing-field-lofi.mp3");
        this.bgm.loop = true;
        this.bgm.volume = 0.35;
      } catch {
        // Safe SSR/browser handling
      }
    }
  }

  // Initialize and start background music on first user interaction
  public initBgm() {
    if (this.isInitialized || !this.bgm || this.isMuted) return;
    this.bgm
      .play()
      .then(() => {
        this.isPlaying = true;
        this.isInitialized = true;
        this.isEnabled = true;
      })
      .catch((err) => {
        console.warn("Autoplay prevented, waiting for user gesture:", err);
      });
  }

  public enableAudio(): void {
    this.isEnabled = true;
    this.isMuted = false;
    this.initBgm();
    if (this.bgm && !this.isPlaying) {
      this.bgm.play().then(() => {
        this.isPlaying = true;
        this.isInitialized = true;
      }).catch(() => {});
    }
  }

  public disableAudio(): void {
    this.isEnabled = false;
    this.isMuted = true;
    if (this.bgm) {
      this.bgm.pause();
      this.isPlaying = false;
    }
  }

  public toggleMute(): boolean {
    if (!this.bgm) return false;
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.bgm.pause();
      this.isPlaying = false;
    } else {
      this.bgm.play().catch(() => {});
      this.isPlaying = true;
      this.isInitialized = true;
      this.isEnabled = true;
    }
    return this.isMuted;
  }

  public toggleBgm(): boolean {
    return !this.toggleMute();
  }

  public getAudioState(): { isEnabled: boolean; isMuted: boolean } {
    return { isEnabled: this.isEnabled, isMuted: this.isMuted };
  }

  public startAmbientDrone(): void {
    this.initBgm();
  }

  public stopAmbientDrone(): void {
    if (this.bgm) {
      this.bgm.pause();
      this.isPlaying = false;
    }
  }

  // Retain existing micro-interaction sound effects
  public playClick() {
    if (this.isMuted) return;
    this.playTone(160, 0.08, "triangle");
  }

  public playHover() {
    if (this.isMuted) return;
    this.playTone(440, 0.03, "sine");
  }

  public playEnterChime(): void {
    if (this.isMuted) return;
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;

      notes.forEach((freq, index) => {
        const noteStart = now + index * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.07, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.6);
      });
    } catch {
      // Safe fallback
    }
  }

  private playTone(freq: number, duration: number, type: OscillatorType) {
    if (typeof window === "undefined" || this.isMuted) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context restrictions before interaction
    }
  }
}

export const soundFx = new AudioEngine();
