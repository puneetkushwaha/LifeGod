import { useRef, useEffect } from 'react';

// Siren sound base64 or URL. Using a placeholder URL for now or a simple oscillator if needed? 
// For a hackathon, a real sound file is better. Let's use a public URL or generate one.
// Using a reliable CDN link for a siren sound.
const SIREN_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'; // Emergency siren

export const useSound = (enabled: boolean) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        if (!audioRef.current) {
            audioRef.current = new Audio(SIREN_URL);
            audioRef.current.loop = true;
            audioRef.current.volume = 1.0;
        }

        const audio = audioRef.current;

        if (enabled) {
            // User interaction is required to play audio, but we assume
            // this hook is triggered after some interaction (like entering the page)
            // or we handle the promise catch.
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.error("Audio playback interrupted/failed:", error);
                });
            }
        } else {
            audio.pause();
            audio.currentTime = 0;
        }

        return () => {
            audio.pause();
        };
    }, [enabled]);

    return null; // This hook just manages side-effects
};
