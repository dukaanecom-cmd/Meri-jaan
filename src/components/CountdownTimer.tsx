import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Clock, PartyPopper, Flame } from 'lucide-react';
import { launchGrandBirthdayFireworks, isBirthdayMidnightPassed } from '../utils/celebrationFireworks';

interface CountdownTimerProps {
  birthDateString?: string; // "2008-10-11"
  partnerName: string;
  onOpenSurprise?: () => void;
  forceCelebration?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasEnded: boolean;
  totalMsRemaining: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  birthDateString = '2008-10-11',
  partnerName,
  onOpenSurprise,
  forceCelebration = false,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasEnded: false,
    totalMsRemaining: 0,
  });

  const [hasTriggeredMidnightFireworks, setHasTriggeredMidnightFireworks] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Target: 11 October at 00:00:00 (Midnight 12:00 AM)
      const bdayMonth = 9; // October is 9
      const bdayDay = 11;
      const targetMidnight = new Date(currentYear, bdayMonth, bdayDay, 0, 0, 0, 0);

      const isEnded = forceCelebration || now.getTime() >= targetMidnight.getTime();

      if (isEnded) {
        // If countdown has finished (12:00 AM has arrived or passed)
        if (!hasTriggeredMidnightFireworks) {
          launchGrandBirthdayFireworks();
          setHasTriggeredMidnightFireworks(true);
        }

        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasEnded: true,
          totalMsRemaining: 0,
        });
        return;
      }

      // Countdown remaining until 11 October 00:00:00
      const diff = targetMidnight.getTime() - now.getTime();
      const totalSeconds = Math.max(0, Math.floor(diff / 1000));
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        hasEnded: false,
        totalMsRemaining: diff,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [birthDateString, forceCelebration, hasTriggeredMidnightFireworks]);

  const pad = (num: number) => String(num).padStart(2, '0');

  const handleManualFireworks = () => {
    launchGrandBirthdayFireworks();
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 px-2">
      {/* Container with gentle rose-champagne border and glassmorphism */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-rose-200/90 shadow-md shadow-rose-950/5 relative overflow-hidden transition-all hover:shadow-lg">
        
        {/* Subtle top caption */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-100/80 text-xs">
          <div className="flex items-center gap-1.5 text-rose-800 font-semibold">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>
              {timeRemaining.hasEnded ? '12:00 AM Milestone Reached' : '18th Birthday Countdown'}
            </span>
          </div>
          <span className="text-[11px] font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
            11 October 2008 · 18 Years 🎂
          </span>
        </div>

        {timeRemaining.hasEnded ? (
          /* ─── 12:00 AM CELEBRATION ACTIVE (PATAKHE & FIREWORKS) ─── */
          <div className="py-2 text-center">
            <div className="inline-flex items-center gap-2 text-rose-600 font-handwriting text-2xl sm:text-4xl font-bold leading-tight">
              <PartyPopper className="w-6 h-6 text-amber-500 animate-bounce" />
              <span>12:00 AM Ho Gaya! Janamdin Mubarak! 🎉</span>
              <PartyPopper className="w-6 h-6 text-amber-500 animate-bounce" />
            </div>

            <p className="text-xs sm:text-sm text-stone-700 mt-1.5 font-poppins font-medium">
              11 October 2008 – Welcome to Sweet 18, {partnerName}! ❤️
            </p>

            <p className="text-[11px] sm:text-xs text-rose-500 mt-1 italic">
              "Aasmano ko chhu le tu ye dua hamari hai..."
            </p>

            {/* Cracker buttons */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={handleManualFireworks}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 text-white rounded-full text-xs font-semibold shadow-md shadow-rose-950/10 flex items-center gap-1.5 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
                <span>Phodo Aur Patakhe! 🎆</span>
              </button>

              {onOpenSurprise && (
                <button
                  onClick={onOpenSurprise}
                  className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-800 border border-rose-200 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Open 18th Wish 🎁</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ─── COUNTDOWN ACTIVE (BEFORE 12:00 AM) ─── */
          <div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              {/* Days Box */}
              <div className="bg-gradient-to-b from-rose-50/70 to-pink-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-rose-100/90 shadow-2xs">
                <span className="font-poppins font-bold text-2xl sm:text-4xl text-rose-700 tabular-nums block leading-tight">
                  {pad(timeRemaining.days)}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mt-0.5">
                  Days
                </span>
              </div>

              {/* Hours Box */}
              <div className="bg-gradient-to-b from-rose-50/70 to-pink-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-rose-100/90 shadow-2xs">
                <span className="font-poppins font-bold text-2xl sm:text-4xl text-rose-700 tabular-nums block leading-tight">
                  {pad(timeRemaining.hours)}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mt-0.5">
                  Hours
                </span>
              </div>

              {/* Minutes Box */}
              <div className="bg-gradient-to-b from-rose-50/70 to-pink-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-rose-100/90 shadow-2xs">
                <span className="font-poppins font-bold text-2xl sm:text-4xl text-rose-700 tabular-nums block leading-tight">
                  {pad(timeRemaining.minutes)}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mt-0.5">
                  Minutes
                </span>
              </div>

              {/* Seconds Box */}
              <div className="bg-gradient-to-b from-rose-50/70 to-pink-50/50 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-rose-100/90 shadow-2xs">
                <span className="font-poppins font-bold text-2xl sm:text-4xl text-pink-600 tabular-nums block leading-tight">
                  {pad(timeRemaining.seconds)}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold text-pink-400 uppercase tracking-wider block mt-0.5">
                  Seconds
                </span>
              </div>
            </div>

            <div className="mt-2.5 text-center text-[10px] sm:text-[11px] text-stone-500 flex items-center justify-center gap-1">
              <span>12:00 AM hote hi celebration & patakhe shuru ho jayenge</span>
              <Sparkles className="w-3 h-3 text-amber-500 inline" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
