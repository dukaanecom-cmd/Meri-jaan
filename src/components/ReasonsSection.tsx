import React from 'react';
import { Heart, Smile, Sparkles, Music, Star, Award, HeartHandshake } from 'lucide-react';
import { RomanticReason } from '../data/birthdayData';

interface ReasonsSectionProps {
  reasons: RomanticReason[];
  partnerName: string;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons, partnerName }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-5 h-5 text-rose-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'Music':
        return <Music className="w-5 h-5 text-rose-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-[#FFF0F4] via-[#FFF5F8] to-[#FFF9F9]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-script text-3xl sm:text-4xl text-rose-500 mb-1">
            Countless Little Things
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 font-poppins">
            Woh Baatein Jo {partnerName} Ko Khaas Banati Hain
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            A few of the infinite reasons my heart beats for you every single day
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-rose-200/70 shadow-sm hover:shadow-xl hover:shadow-rose-400/15 transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4 shadow-xs">
                  {getIcon(reason.iconName)}
                </div>
                <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                  Reason #0{index + 1}
                </span>
                <h3 className="text-lg font-bold text-rose-950 mt-1 mb-2 font-poppins">
                  {reason.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-rose-100/60 flex items-center justify-between text-xs text-rose-400">
                <span className="font-handwriting text-base font-bold text-rose-600">Pure Love</span>
                <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
