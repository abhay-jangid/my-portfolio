/**
 * Zero-Dependency Web Audio & Background Lofi Music Engine (audioEngine.ts)
 * --------------------------------------------------------------------------
 * Handles UI sound feedback (hover, click, enter chime) and background stream
 * of "crossing field but it's lofi (sword art online)_spotdown.org.mp3" at 40% volume,
 * with tab visibility handling, mute state sync, and zero synthetic oscillator hum.
 */

const AUDIO_SRC =
  "/audio/crossing%20field%20but%20it's%20lofi%20(sword%20art%20online)_spotdown.org.mp3";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isEnabled: boolean = true;
  private isMusicPlaying: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("portfolio_audio_muted");
      if (savedMute !== null) {
        this.isMuted = savedMute === "true";
      }

      // Visibility change listener: pause audio when hidden, resume if active
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (this.bgmAudio && !this.bgmAudio.paused) {
            this.bgmAudio.pause();
          }
        } else {
          if (this.isMusicPlaying && !this.isMuted && this.isEnabled && this.bgmAudio) {
            this.bgmAudio.play().catch(() => {});
          }
        }
      });
    }
  }

  private getBgm(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio(AUDIO_SRC);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.4;
    }
    return this.bgmAudio;
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public enableAudio(): void {
    this.isEnabled = true;
    this.isMuted = false;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_audio_muted", "false");
    }
    this.getContext();
  }

  public disableAudio(): void {
    this.isEnabled = false;
    this.isMuted = true;
    this.stopBgm();
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_audio_muted", "true");
    }
  }

  public startBgm(): void {
    if (this.isMuted || !this.isEnabled) return;
    const audio = this.getBgm();
    if (audio) {
      audio.volume = 0.4;
      audio.play().catch((err) => console.log("Audio play blocked:", err));
      this.isMusicPlaying = true;
    }
  }

  public stopBgm(): void {
    this.isMusicPlaying = false;
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_audio_muted", String(this.isMuted));
    }
    if (this.isMuted) {
      if (this.bgmAudio) {
        this.bgmAudio.pause();
      }
    } else {
      this.enableAudio();
      this.startBgm();
    }
    return this.isMuted;
  }

  public initBgm(): void {
    this.startBgm();
  }

  public startAmbientDrone(): void {
    this.startBgm();
  }

  public stopAmbientDrone(): void {
    this.stopBgm();
  }

  public toggleBgm(): boolean {
    return !this.toggleMute();
  }

  public getAudioState(): { isEnabled: boolean; isMuted: boolean; isPlaying: boolean } {
    return { isEnabled: this.isEnabled, isMuted: this.isMuted, isPlaying: this.isMusicPlaying };
  }

  /**
   * Hover Tick: Ultra-short, high-frequency subtle sine pulse
   */
  public playHover(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.025);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }

  /**
   * Click Chime: Harmonic frequency sweep with crisp decay
   */
  public playClick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  /**
   * Enter Chime: Polyphonic harmonic triad chord sweep (C5, E5, G5, C6)
   */
  public playEnterChime(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        const noteStart = now + index * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.06, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.7);
      });
    } catch {}
  }
}

export const soundFx = new AudioEngine();
