/**
 * Romantic Audio Engine
 * Plays a gentle, ambient lofi-piano romantic harmonic chord progression
 * using Web Audio API so it plays reliably on any browser without broken audio links or CORS errors.
 * Also supports playing an external custom MP3 URL if provided by the user.
 */

class RomanticAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private timerId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string = "";
  private onStateChangeListeners: Array<(isPlaying: boolean) => void> = [];

  constructor() {
    // Initialized on user interaction
  }

  public subscribe(listener: (isPlaying: boolean) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach(cb => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setCustomAudioUrl(url: string) {
    this.customAudioUrl = url;
    if (this.customAudio) {
      this.customAudio.src = url;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public async play() {
    if (this.customAudioUrl) {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(this.customAudioUrl);
          this.customAudio.loop = true;
        }
        await this.customAudio.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch (err) {
        console.warn("External audio playback failed, falling back to romantic synth:", err);
      }
    }

    // Web Audio Synthesizer fallback
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      this.isPlaying = true;
      this.startChordsLoop();
      this.notify();
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  // Soft romantic progression: Cmaj9 -> Am9 -> Fmaj7 -> G9sus4
  private chords = [
    // Cmaj9 [C3, E3, G3, B3, D4]
    [130.81, 164.81, 196.00, 246.94, 293.66],
    // Am9 [A2, C3, E3, G3, B3]
    [110.00, 130.81, 164.81, 196.00, 246.94],
    // Fmaj7 [F2, A2, C3, E3, G3]
    [87.31, 110.00, 130.81, 164.81, 196.00],
    // Gsus4 -> G7 [G2, D3, G3, B3, F4]
    [98.00, 146.83, 196.00, 246.94, 349.23],
  ];

  private chordIndex = 0;

  private playRomanticChord(freqs: number[]) {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Master filter for soft warm vintage sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, now);
    masterGain.connect(ctx.destination);
    filter.connect(masterGain);

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Soft triangle + sine blend for warm electric piano feel
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08); // slight arpeggiation delay

      // Soft envelope
      const startTime = now + i * 0.08;
      const attack = 0.35;
      const release = 3.2;

      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.linearRampToValueAtTime(0.25 / freqs.length, startTime + attack);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + attack + release);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(startTime);
      osc.stop(startTime + attack + release + 0.1);
    });
  }

  private startChordsLoop() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    // Play first chord immediately
    this.playRomanticChord(this.chords[this.chordIndex]);
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    // Loop chords every 3.6 seconds
    this.timerId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playRomanticChord(this.chords[this.chordIndex]);
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    }, 3600);
  }
}

export const romanticAudio = new RomanticAudioEngine();
