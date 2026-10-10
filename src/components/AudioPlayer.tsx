import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, Sparkles, Settings2, Disc3 } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface AudioPlayerProps {
  partnerName: string;
  songTitle?: string;
  videoId?: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  partnerName,
  songTitle = 'Aasmano Ko Chhu Le Tu',
  videoId = 'qACQuR8nGzY',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>(videoId);
  const [customAudioUrl, setCustomAudioUrl] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('Aasmano Ko Chhu Le Tu (Birthday Song)');

  const playerRef = useRef<any>(null);
  const containerId = 'youtube-birthday-audio-container';

  // 1. Load YouTube Iframe API once and initialize player
  useEffect(() => {
    let isCancelled = false;

    const initYT = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        // Check if script tag already exists
        if (!document.getElementById('youtube-iframe-api-script')) {
          const tag = document.createElement('script');
          tag.id = 'youtube-iframe-api-script';
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const prevReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevReady) prevReady();
          if (!isCancelled) createPlayer();
        };
      }
    };

    const createPlayer = () => {
      try {
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch {
            // ignore
          }
        }

        playerRef.current = new window.YT.Player(containerId, {
          height: '1',
          width: '1',
          videoId: currentVideoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: currentVideoId,
            playsinline: 1,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
              try {
                // Try immediate autoplay
                event.target.playVideo();
                setIsPlaying(true);
                setHasStarted(true);
              } catch (e) {
                console.log('Autoplay deferred until user interaction:', e);
              }
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
                setHasStarted(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Loop video
                event.target.playVideo();
              }
            },
            onError: (err: any) => {
              console.warn('YouTube Player error, falling back to romantic audio synth:', err);
              // Fallback to web audio synthesizer
              romanticAudio.play();
              setIsPlaying(true);
            },
          },
        });
      } catch (e) {
        console.warn('Error initializing YouTube Player:', e);
        // Fallback to web audio synth
        romanticAudio.play();
      }
    };

    initYT();

    return () => {
      isCancelled = true;
    };
  }, [currentVideoId]);

  // 2. Global Autoplay Interaction Listener (plays immediately on first tap/scroll/click)
  useEffect(() => {
    const startAudioOnFirstAction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.playVideo();
          setIsPlaying(true);
          setHasStarted(true);
        } catch {
          // fallback
          romanticAudio.play();
          setIsPlaying(true);
        }
      } else {
        romanticAudio.play();
        setIsPlaying(true);
      }

      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', startAudioOnFirstAction);
      window.removeEventListener('touchstart', startAudioOnFirstAction);
      window.removeEventListener('scroll', startAudioOnFirstAction);
      window.removeEventListener('keydown', startAudioOnFirstAction);
    };

    window.addEventListener('click', startAudioOnFirstAction, { once: true });
    window.addEventListener('touchstart', startAudioOnFirstAction, { once: true, passive: true });
    window.addEventListener('scroll', startAudioOnFirstAction, { once: true, passive: true });
    window.addEventListener('keydown', startAudioOnFirstAction, { once: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  const handleTogglePlay = () => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      const state = playerRef.current.getPlayerState();
      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        setHasStarted(true);
      }
    } else {
      // Synthesizer fallback toggle
      const state = romanticAudio.toggle();
      setIsPlaying(state);
      setHasStarted(true);
    }
  };

  const handleApplyCustomAudio = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAudioUrl.trim()) {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
      romanticAudio.setCustomAudioUrl(customAudioUrl.trim());
      romanticAudio.play();
      setIsPlaying(true);
      setStatusMessage('Custom Audio Link');
      setShowSettings(false);
    }
  };

  const handleSelectSongVersion = (id: string, name: string) => {
    setCurrentVideoId(id);
    setStatusMessage(name);
    setShowSettings(false);
  };

  return (
    <>
      {/* Hidden YouTube Iframe Player Container */}
      <div
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id={containerId} />
      </div>

      {/* Floating Gentle Banner if user hasn't clicked yet and song is waiting for interaction */}
      {!hasStarted && (
        <div
          onClick={handleTogglePlay}
          className="fixed top-18 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white px-5 py-2 rounded-full shadow-lg shadow-rose-950/20 text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Tap anywhere to start "Aasmano Ko Chhu Le Tu" 🎵</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold">Play</span>
        </div>
      )}

      {/* Floating Audio Controller Widget (Top Right) */}
      <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
        <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-rose-200/90 shadow-md shadow-rose-950/5 hover:shadow-lg transition-all">
          
          {/* Rotating vinyl icon when playing */}
          <div className="relative flex items-center justify-center">
            <Disc3
              className={`w-5 h-5 text-rose-500 transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            />
            {isPlaying && (
              <span className="absolute w-1.5 h-1.5 bg-rose-600 rounded-full" />
            )}
          </div>

          {/* Sound waves animation */}
          <div className="flex items-end gap-0.5 h-3.5 px-0.5">
            <span
              className={`w-1 bg-rose-500 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-[bounce_0.7s_infinite] h-3.5' : 'h-1.5'
              }`}
            />
            <span
              className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-[bounce_0.5s_infinite_0.15s] h-3' : 'h-2'
              }`}
            />
            <span
              className={`w-1 bg-rose-600 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-[bounce_0.8s_infinite_0.3s] h-4' : 'h-1'
              }`}
            />
          </div>

          {/* Main Play / Pause Button with song title */}
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-950 hover:text-rose-600 transition-colors focus-visible:outline-none"
            title={isPlaying ? 'Pause Song' : 'Play Song'}
            aria-label={isPlaying ? 'Pause Song' : 'Play Song'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                <span className="max-w-[130px] sm:max-w-[190px] truncate">
                  Aasmano Ko Chhu Le Tu 🎵
                </span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                <span className="max-w-[130px] sm:max-w-[190px] truncate">
                  Play Birthday Song
                </span>
              </>
            )}
          </button>

          {/* Music Settings Cog */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 text-rose-400 hover:text-rose-800 transition-colors rounded-full"
            title="Song Options"
            aria-label="Song Settings"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Music Options Dropdown */}
        {showSettings && (
          <div className="w-80 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-rose-200 shadow-xl shadow-rose-950/10 text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-100">
              <span className="font-semibold text-rose-950 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-rose-500" /> Song Settings
              </span>
              <span className="text-[10px] text-rose-500 font-medium truncate max-w-[120px]">
                {statusMessage}
              </span>
            </div>

            <p className="text-stone-600 text-[11px] mb-2 leading-relaxed">
              Website open hone par <strong>"Aasmano Ko Chhu Le Tu Ye Dua Hamari Hai"</strong> gaana automatically play ho raha hai.
            </p>

            <div className="space-y-1.5 mb-3">
              <button
                type="button"
                onClick={() =>
                  handleSelectSongVersion(
                    'qACQuR8nGzY',
                    'Aasmano Ko Chhu Le Tu (Full Song)'
                  )
                }
                className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  currentVideoId === 'qACQuR8nGzY'
                    ? 'border-rose-400 bg-rose-50 text-rose-900 font-bold'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                🎵 Version 1: Aasmano Ko Chhu Le Tu (Full Version)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSelectSongVersion(
                    'RukLv3JY-rE',
                    'Aasmano Ko Chhu Le Tu (Original 34s Clip)'
                  )
                }
                className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  currentVideoId === 'RukLv3JY-rE'
                    ? 'border-rose-400 bg-rose-50 text-rose-900 font-bold'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                🎵 Version 2: Aasmano Ko Chhu Le Tu (Original Clip)
              </button>
            </div>

            <form onSubmit={handleApplyCustomAudio} className="space-y-2 pt-2 border-t border-rose-100">
              <label className="block text-[11px] text-stone-600 font-medium">
                Ya apna custom MP3 Audio link daalein:
              </label>
              <input
                type="url"
                placeholder="https://example.com/song.mp3"
                value={customAudioUrl}
                onChange={(e) => setCustomAudioUrl(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50/40 text-stone-800 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-2 py-1 text-[11px] text-stone-500 hover:text-stone-800"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium text-[11px]"
                >
                  Apply MP3
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
