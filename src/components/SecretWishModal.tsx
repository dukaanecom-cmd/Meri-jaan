import React, { useState, useEffect } from 'react';
import { Gift, X, Sparkles, Heart, Flame, RefreshCw, CheckCircle2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayData } from '../data/birthdayData';

interface SecretWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayData;
}

export const SecretWishModal: React.FC<SecretWishModalProps> = ({ isOpen, onClose, data }) => {
  const [candleLit, setCandleLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  // Trigger grand romantic confetti explosion
  const triggerRomanticConfetti = () => {
    // Stage 1: Hearts and pink ribbons
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#FB7185', '#FDA4AF', '#F59E0B', '#F472B6'],
    });

    // Stage 2: Left and right cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E11D48', '#BE185D', '#FDE047'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E11D48', '#BE185D', '#FDE047'],
      });
    }, 250);
  };

  useEffect(() => {
    if (isOpen) {
      triggerRomanticConfetti();
      setCandleLit(true);
      setWishMade(false);
    }
  }, [isOpen]);

  const handleBlowCandle = () => {
    setCandleLit(false);
    setWishMade(true);
    triggerRomanticConfetti();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-[#FFFDFD] via-[#FFF5F7] to-[#FFF9FB] rounded-3xl p-6 sm:p-10 border-2 border-rose-200/90 shadow-2xl shadow-rose-950/20 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-rose-100 transition-colors"
          aria-label="Close Surprise Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Surprise Gift Header */}
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-rose-100 text-rose-600 mb-2 shadow-inner">
            <Gift className="w-8 h-8 animate-bounce" />
          </div>
          <p className="font-script text-3xl sm:text-4xl text-rose-500 mb-1">
            Sweet 18 Surprise
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-rose-950 font-poppins">
            {data.secretModalTitle}
          </h3>
        </div>

        {/* ─── VIRTUAL 18TH BIRTHDAY CAKE & CANDLE FEATURE ─── */}
        <div className="my-6 p-5 rounded-2xl bg-white border border-rose-200/70 shadow-sm text-center flex flex-col items-center">
          <div className="relative mb-3 flex flex-col items-center">
            
            {/* 18th Birthday Golden Candle Numbers */}
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold text-xs tracking-wider shadow-sm">
                18th Milestone
              </span>
            </div>

            {/* Candle flame */}
            <button
              onClick={handleBlowCandle}
              className="group focus:outline-none flex flex-col items-center cursor-pointer"
              title="Click to blow out the 18th birthday candle and make a wish!"
            >
              {candleLit ? (
                <div className="relative flex flex-col items-center">
                  <div className="w-4 h-6 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-pulse shadow-lg shadow-amber-400/80" />
                  <span className="text-[10px] text-amber-800 font-bold mt-1 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 animate-bounce">
                    Blow the 18th Candle 💨
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    18th Birthday Wish Made! ✨
                  </span>
                </div>
              )}
              {/* Candle Stick */}
              <div className="w-3 h-8 bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 rounded-t-xs mt-0.5 shadow-xs flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">18</span>
              </div>
            </button>

            {/* Stylized Birthday Cake */}
            <div className="w-32 h-10 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-xl border-t-2 border-white relative shadow-inner flex items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                <span className="font-handwriting text-rose-800 font-bold text-sm">Sweet 18</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              </div>
            </div>
            <div className="w-40 h-9 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-b-xl border-t border-rose-300 shadow-md flex items-center justify-center">
              <span className="font-handwriting text-white text-base font-bold tracking-wider">
                {data.partnerName} · 18 ❤️
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-500">
            {wishMade
              ? "Aapke 18 saal poore hone par dil se dua: May all your 18th year wishes come true!"
              : "Candle par click karke phoonk maaro aur 18th birthday wish maango! 🎂"}
          </p>
        </div>

        {/* Secret Wish Emotional Prose */}
        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200/80 text-stone-800 leading-relaxed text-sm sm:text-base font-poppins text-justify sm:text-left mb-6">
          <p className="font-handwriting text-2xl text-rose-700 font-bold mb-2">
            Meri Sabse Pyari {data.partnerName},
          </p>
          <p>{data.secretWishText}</p>
        </div>

        {/* 3 Romantic Promises */}
        <div className="space-y-2.5 mb-6">
          <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            18th Birthday Promises from My Heart:
          </p>
          {data.secretPromises.map((promise, idx) => (
            <div
              key={idx}
              className="p-3 bg-white rounded-xl border border-rose-150 flex items-start gap-2.5 shadow-xs text-xs sm:text-sm text-stone-700"
            >
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{promise}</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-rose-150">
          <button
            onClick={triggerRomanticConfetti}
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>More Confetti! 🎉</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-xs font-semibold shadow-md shadow-rose-950/10 transition-all"
          >
            I Love This Surprise ❤️
          </button>
        </div>
      </div>
    </div>
  );
};
