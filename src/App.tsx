import React, { useState, useEffect } from 'react';
import { initialBirthdayData, BirthdayData } from './data/birthdayData';
import { FloatingParticles } from './components/FloatingParticles';
import { Navbar } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { GallerySection } from './components/GallerySection';
import { ReasonsSection } from './components/ReasonsSection';
import { SecretWishModal } from './components/SecretWishModal';
import { CustomizerModal } from './components/CustomizerModal';
import { Footer } from './components/Footer';
import {
  loadPersistedBirthdayData,
  savePersistedBirthdayData,
  uploadPhotoFilePermanently,
} from './utils/storage';
import { launchGrandBirthdayFireworks, isBirthdayMidnightPassed } from './utils/celebrationFireworks';
import { Edit3, CheckCircle2, Share2, Sparkles } from 'lucide-react';

export default function App() {
  // Central State for all birthday customization
  const [data, setData] = useState<BirthdayData>(initialBirthdayData);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Load saved data permanently on mount & launch fireworks if 12:00 AM reached
  useEffect(() => {
    loadPersistedBirthdayData().then((loadedData) => {
      setData(loadedData);

      // Har baar jab link open hoga aur 12:00 AM ho chuka hoga -> Patakhe phutenge aur celebration hogi!
      if (isBirthdayMidnightPassed(loadedData.birthDate || '2008-10-11')) {
        setTimeout(() => {
          launchGrandBirthdayFireworks();
        }, 700);
      }
    });
  }, []);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => {
      setSaveToast(null);
    }, 3200);
  };

  // Handler to update photos with permanent file upload & disk saving
  const handleUpdatePhoto = async (photoId: number, rawDataUrl: string) => {
    // 1. Instantly update UI for 0ms lag
    setData((prev) => ({
      ...prev,
      photos: prev.photos.map((p) =>
        p.id === photoId ? { ...p, imageUrl: rawDataUrl } : p
      ),
    }));

    triggerToast('Saving photo permanently...');

    // 2. Upload to server file system to get persistent URL
    const permanentUrl = await uploadPhotoFilePermanently(photoId, rawDataUrl);

    // 3. Save the updated configuration to server disk and local storage
    const updatedData: BirthdayData = {
      ...data,
      photos: data.photos.map((p) =>
        p.id === photoId ? { ...p, imageUrl: permanentUrl } : p
      ),
    };

    setData(updatedData);
    await savePersistedBirthdayData(updatedData);
    triggerToast('Photo permanently saved to server & memory! ✅');
  };

  const handleSaveData = async (newData: BirthdayData) => {
    setData(newData);
    await savePersistedBirthdayData(newData);
    triggerToast('All changes permanently saved! ✅');
  };

  return (
    <div className="min-h-screen relative font-poppins text-stone-800 bg-[#FFF9F9] selection:bg-rose-200 selection:text-rose-900">
      
      {/* 1. Background Floating Particles (Hearts, Sparkles & Rose Petals) */}
      <FloatingParticles />

      {/* 2. Top Navigation Bar */}
      <Navbar
        partnerName={data.partnerName}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
      />

      {/* 3. Floating Romantic Background Music Player (Auto-plays on open) */}
      <AudioPlayer
        partnerName={data.partnerName}
        songTitle={data.songTitle}
        videoId={data.youtubeVideoId}
      />

      {/* 4. Hero Section with 18th Birthday Countdown, Animated Heading & Scroll Action */}
      <main>
        <HeroSection
          data={data}
          onOpenSurprise={() => setIsSurpriseOpen(true)}
        />

        {/* 5. Heart-touching Romantic Love Letter / Birthday Wishes */}
        <LoveLetterSection
          data={data}
          onEditRequested={() => setIsCustomizerOpen(true)}
        />

        {/* 6. Photo Gallery / Memory Lane with Grid/Carousel & Permanent Upload */}
        <GallerySection
          photos={data.photos}
          onUpdatePhoto={handleUpdatePhoto}
        />

        {/* 7. Romantic Reasons ("Why I Love You") */}
        <div id="reasons">
          <ReasonsSection
            reasons={data.reasons}
            partnerName={data.partnerName}
          />
        </div>
      </main>

      {/* 8. Romantic Footer */}
      <Footer
        data={data}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
      />

      {/* 9. Interactive Secret Wish Modal with Realistic Confetti & Virtual 18th Cake */}
      <SecretWishModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        data={data}
      />

      {/* 10. Live Customizer Modal & Code File Guide with Permanent Save */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        data={data}
        onSaveData={handleSaveData}
      />

      {/* 11. Floating Permanent Save Notification Toast */}
      {saveToast && (
        <div className="fixed bottom-18 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl backdrop-blur-sm flex items-center gap-2 border border-rose-500/30 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* 12. Floating Quick Customizer Button (bottom-left) */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md text-rose-800 border border-rose-200/90 shadow-md shadow-rose-950/10 hover:shadow-lg hover:border-rose-400 text-xs font-semibold transition-all hover:scale-105 group"
          title="Customize Partner's Name & Details"
        >
          <Edit3 className="w-3.5 h-3.5 text-rose-500 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Customize & Save</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>

    </div>
  );
}
