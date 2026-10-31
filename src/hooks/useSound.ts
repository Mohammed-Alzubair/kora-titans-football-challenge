import { useRef, useCallback, useEffect, useState } from 'react';


/* Original stadium-arcade cues, synthesized locally so answer sounds work offline. */
const SFX_TYPES = [
  'correct', 'wrong', 'tick', 'gameOver', 'streakHype', 'streakEpic',
  'click', 'transition', 'reward', 'unlock', 'victory', 'crowd',
] as const;

const MUSIC_TRACKS = {
  progress: '/sounds/progress-music.mp3',
  menu: '/sounds/menu-music.mp4',
};

type SfxType = typeof SFX_TYPES[number];
type MusicTrack = keyof typeof MUSIC_TRACKS;

interface SoundNote {
  frequency: number;
  delay: number;
  duration: number;
  gain: number;
  waveform?: OscillatorType;
  endFrequency?: number;
}

const CUES: Record<SfxType, SoundNote[]> = {
  correct: [
    { frequency: 523.25, delay: 0, duration: 0.15, gain: 0.2, waveform: 'triangle' },
    { frequency: 659.25, delay: 0.1, duration: 0.19, gain: 0.19, waveform: 'triangle' },
    { frequency: 783.99, delay: 0.2, duration: 0.25, gain: 0.2, waveform: 'sine' },
    { frequency: 1046.5, delay: 0.32, duration: 0.46, gain: 0.15, waveform: 'sine' },
  ],
  wrong: [
    { frequency: 392, delay: 0, duration: 0.13, gain: 0.11, waveform: 'sine' },
    { frequency: 329.63, delay: 0.12, duration: 0.2, gain: 0.12, waveform: 'triangle' },
    { frequency: 261.63, delay: 0.24, duration: 0.32, gain: 0.09, waveform: 'sine' },
  ],
  tick: [{ frequency: 987.77, delay: 0, duration: 0.055, gain: 0.08, waveform: 'sine' }],
  gameOver: [
    { frequency: 392, delay: 0, duration: 0.2, gain: 0.13, waveform: 'triangle' },
    { frequency: 311.13, delay: 0.19, duration: 0.24, gain: 0.12, waveform: 'triangle' },
    { frequency: 261.63, delay: 0.4, duration: 0.5, gain: 0.14, waveform: 'sine' },
  ],
  streakHype: [
    { frequency: 659.25, delay: 0, duration: 0.12, gain: 0.16, waveform: 'triangle' },
    { frequency: 783.99, delay: 0.1, duration: 0.16, gain: 0.18, waveform: 'triangle' },
    { frequency: 987.77, delay: 0.2, duration: 0.3, gain: 0.16, waveform: 'sine' },
  ],
  streakEpic: [
    { frequency: 523.25, delay: 0, duration: 0.16, gain: 0.14, waveform: 'triangle' },
    { frequency: 659.25, delay: 0.1, duration: 0.19, gain: 0.15, waveform: 'triangle' },
    { frequency: 783.99, delay: 0.2, duration: 0.21, gain: 0.16, waveform: 'triangle' },
    { frequency: 987.77, delay: 0.3, duration: 0.25, gain: 0.16, waveform: 'sine' },
    { frequency: 1318.51, delay: 0.44, duration: 0.48, gain: 0.13, waveform: 'sine' },
  ],
  click: [{ frequency: 740, delay: 0, duration: 0.035, gain: 0.06, waveform: 'square' }],
  transition: [
    { frequency: 392, delay: 0, duration: 0.17, gain: 0.1, waveform: 'sine' },
    { frequency: 587.33, delay: 0.1, duration: 0.24, gain: 0.11, waveform: 'triangle' },
  ],
  reward: [
    { frequency: 783.99, delay: 0, duration: 0.12, gain: 0.15, waveform: 'sine' },
    { frequency: 987.77, delay: 0.1, duration: 0.18, gain: 0.17, waveform: 'sine' },
    { frequency: 1174.66, delay: 0.2, duration: 0.35, gain: 0.14, waveform: 'triangle' },
  ],
  unlock: [
    { frequency: 440, delay: 0, duration: 0.12, gain: 0.13, waveform: 'triangle' },
    { frequency: 554.37, delay: 0.11, duration: 0.15, gain: 0.14, waveform: 'triangle' },
    { frequency: 659.25, delay: 0.22, duration: 0.17, gain: 0.16, waveform: 'triangle' },
    { frequency: 880, delay: 0.34, duration: 0.42, gain: 0.16, waveform: 'sine' },
  ],
  victory: [
    { frequency: 523.25, delay: 0, duration: 0.18, gain: 0.14, waveform: 'triangle' },
    { frequency: 659.25, delay: 0.12, duration: 0.2, gain: 0.16, waveform: 'triangle' },
    { frequency: 783.99, delay: 0.24, duration: 0.22, gain: 0.17, waveform: 'triangle' },
    { frequency: 1046.5, delay: 0.36, duration: 0.25, gain: 0.17, waveform: 'sine' },
    { frequency: 1318.51, delay: 0.52, duration: 0.6, gain: 0.14, waveform: 'sine' },
  ],
  crowd: [
    { frequency: 130.81, delay: 0, duration: 0.72, gain: 0.12, waveform: 'sine' },
    { frequency: 196, delay: 0.05, duration: 0.68, gain: 0.09, waveform: 'triangle' },
    { frequency: 261.63, delay: 0.14, duration: 0.58, gain: 0.07, waveform: 'triangle' },
  ],
};

function scheduleTone(context: AudioContext, note: SoundNote, startTime: number, masterVolume: number) {
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  const start = startTime + note.delay;
  const peak = Math.max(0.0001, note.gain * masterVolume);
  oscillator.type = note.waveform ?? 'sine';
  oscillator.frequency.setValueAtTime(note.frequency, start);
  if (note.endFrequency) oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, start + note.duration);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.018, note.duration / 3));
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + note.duration);
  oscillator.connect(envelope);
  envelope.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + note.duration + 0.02);
}

function playCue(context: AudioContext, type: SfxType, volume: number) {
  const start = context.currentTime + 0.01;
  CUES[type].forEach((note) => scheduleTone(context, note, start, volume));
  if (type === 'crowd') scheduleCrowdTexture(context, start, volume);
}

function scheduleCrowdTexture(context: AudioContext, start: number, volume: number) {
  const sampleCount = Math.floor(context.sampleRate * 0.12);
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < sampleCount; i += 1) {
    const decay = 1 - i / sampleCount;
    channel[i] = (Math.random() * 2 - 1) * decay * decay;
  }

  for (let burst = 0; burst < 4; burst += 1) {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    const at = start + 0.08 + burst * 0.13;
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100 + burst * 90, at);
    filter.Q.setValueAtTime(0.8, at);
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.12), at + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + 0.12);
    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(context.destination);
    source.start(at);
    source.stop(at + 0.13);
  }
}

/* ─── localStorage helpers ─── */
function getSavedVolume(key: string, fallback: number): number {
  const saved = localStorage.getItem(key);
  const percent = saved === null ? Number.NaN : Number.parseInt(saved, 10);
  return Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) / 100 : fallback;
}
function getSavedMenuVolume(): number { return getSavedVolume('game_menu_volume', 0.3); }
function getSavedProgressVolume(): number { return getSavedVolume('game_progress_volume', 0.3); }
function getSavedTrackVolume(track: MusicTrack): number {
  return track === 'menu' ? getSavedMenuVolume() : getSavedProgressVolume();
}
function getSavedSfxVolume(): number {
  return getSavedVolume('game_sfx_volume', 0.7);
}
function isMusicEnabled(): boolean {
  return localStorage.getItem('game_sound') !== 'false' && localStorage.getItem('game_music') !== 'false';
}
function isSfxEnabled(): boolean {
  return localStorage.getItem('game_sound') !== 'false' && localStorage.getItem('game_sfx') !== 'false';
}

/* ─── Fade helper ─── */
const FADE_MS = 1500;

function fadeAudio(audio: HTMLAudioElement, from: number, to: number, duration = FADE_MS): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    audio.volume = Math.max(0, Math.min(1, from));
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}

/* ─── Hook ─── */
export function useSound() {
  const musicRefs = useRef<Record<string, HTMLAudioElement>>({});
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentTrackRef = useRef<MusicTrack | null>(null);
  const fadingRef = useRef(false);
  

  const [menuVolume, setMenuVolumeState] = useState(getSavedMenuVolume);
  const [progressVolume, setProgressVolumeState] = useState(getSavedProgressVolume);
  const [sfxVolume, setSfxVolumeState] = useState(getSavedSfxVolume);

  // Preload
  useEffect(() => {
    Object.entries(MUSIC_TRACKS).forEach(([key, url]) => {
      const a = new Audio(url);
      a.preload = 'auto';
      a.loop = true;
      a.volume = 0;
      musicRefs.current[key] = a;
    });
    return () => {
      Object.values(musicRefs.current).forEach(a => { a.pause(); a.src = ''; });
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  // Sync menu volume to playing track
  useEffect(() => {
    if (currentTrackRef.current === 'menu') {
      const a = musicRefs.current['menu'];
      if (a && !a.paused) a.volume = Math.max(0, Math.min(1, menuVolume));
    }
  }, [menuVolume]);

  // Sync progress volume to playing track
  useEffect(() => {
    if (currentTrackRef.current === 'progress') {
      const a = musicRefs.current['progress'];
      if (a && !a.paused) a.volume = Math.max(0, Math.min(1, progressVolume));
    }
  }, [progressVolume]);

  /* ─── Play SFX ─── */
  const playSound = useCallback((type: SfxType) => {
    if (!isSfxEnabled()) return;
    if (typeof window === 'undefined' || !window.AudioContext) return;
    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;
    if (context.state === 'suspended') void context.resume().catch(() => {});
    playCue(context, type, getSavedSfxVolume());
  }, []);

  /* ─── Play Music (with crossfade) ─── */
  const playMusic = useCallback((track: MusicTrack) => {
    if (!isMusicEnabled()) return;
    const targetVol = getSavedTrackVolume(track);
    if (currentTrackRef.current === track) {
      const a = musicRefs.current[track];
      if (a && a.paused) {
        a.volume = 0;
        a.play().catch(() => {});
        fadeAudio(a, 0, targetVol);
      }
      return;
    }
    if (fadingRef.current) return;
    fadingRef.current = true;

    const newAudio = musicRefs.current[track];
    const oldTrack = currentTrackRef.current;
    const oldAudio = oldTrack ? musicRefs.current[oldTrack] : null;

    currentTrackRef.current = track;

    if (newAudio) {
      newAudio.volume = 0;
      newAudio.currentTime = 0;
      newAudio.play().catch(() => {});
    }

    const fadeInPromise = newAudio ? fadeAudio(newAudio, 0, targetVol) : Promise.resolve();
    const fadeOutPromise = oldAudio && !oldAudio.paused
      ? fadeAudio(oldAudio, oldAudio.volume, 0).then(() => { oldAudio.pause(); oldAudio.currentTime = 0; })
      : Promise.resolve();

    Promise.all([fadeInPromise, fadeOutPromise]).then(() => {
      fadingRef.current = false;
    });
  }, []);

  /* ─── Stop Music ─── */
  const stopMusic = useCallback(() => {
    const track = currentTrackRef.current;
    if (!track) return;
    const a = musicRefs.current[track];
    if (a && !a.paused) {
      fadeAudio(a, a.volume, 0, 800).then(() => {
        a.pause();
        a.currentTime = 0;
      });
    }
    currentTrackRef.current = null;
  }, []);

  /* ─── Volume setters ─── */
  const setMenuVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setMenuVolumeState(clamped);
    localStorage.setItem('game_menu_volume', String(Math.round(clamped * 100)));
    if (currentTrackRef.current === 'menu') {
      const a = musicRefs.current['menu'];
      if (a && !a.paused) a.volume = clamped;
    }
  }, []);

  const setProgressVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setProgressVolumeState(clamped);
    localStorage.setItem('game_progress_volume', String(Math.round(clamped * 100)));
    if (currentTrackRef.current === 'progress') {
      const a = musicRefs.current['progress'];
      if (a && !a.paused) a.volume = clamped;
    }
  }, []);

  // Keep backward-compatible setMusicVolume that sets both
  const setMusicVolume = useCallback((v: number) => {
    setMenuVolume(v);
    setProgressVolume(v);
  }, [setMenuVolume, setProgressVolume]);

  const setSfxVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setSfxVolumeState(clamped);
    localStorage.setItem('game_sfx_volume', String(Math.round(clamped * 100)));
  }, []);

  return {
    playSound,
    playMusic,
    stopMusic,
    setMusicVolume,
    setMenuVolume,
    setProgressVolume,
    setSfxVolume,
    musicVolume: menuVolume,
    menuVolume,
    progressVolume,
    sfxVolume,
    volume: menuVolume,
  };
}
