import React, { useState } from 'react';
import { Settings, X, Heart, Sparkles, Check, FileCode, Music, Image as ImageIcon, Share2, Link as LinkIcon, PartyPopper } from 'lucide-react';
import { BirthdayData } from '../data/birthdayData';
import { launchGrandBirthdayFireworks } from '../utils/celebrationFireworks';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BirthdayData;
  onSaveData: (newData: BirthdayData) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
}) => {
  const [age, setAge] = useState<number>(data.age || 18);
  const [birthDate, setBirthDate] = useState<string>(data.birthDate || '2008-10-11');
  const [partnerName, setPartnerName] = useState(data.partnerName);
  const [senderName, setSenderName] = useState(data.senderName);
  const [partnerNickname, setPartnerNickname] = useState(data.partnerNickname);
  const [heroSubtext, setHeroSubtext] = useState(data.heroSubtext);
  const [firstLetterPara, setFirstLetterPara] = useState(data.letterParagraphs[0] || '');
  const [secretWishText, setSecretWishText] = useState(data.secretWishText);
  const [showCodeGuide, setShowCodeGuide] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BirthdayData = {
      ...data,
      age: Number(age) || 18,
      birthDate: birthDate.trim() || '2008-10-11',
      birthDateDisplay: '11 October 2008 · Sweet 18th Birthday ✨',
      ageMilestoneTitle: `Celebrating ${age} Beautiful Years ✨ Sweet ${age}`,
      partnerName: partnerName.trim() || data.partnerName,
      senderName: senderName.trim() || data.senderName,
      partnerNickname: partnerNickname.trim() || data.partnerNickname,
      heroSubtext: heroSubtext.trim() || data.heroSubtext,
      letterParagraphs: [firstLetterPara, ...data.letterParagraphs.slice(1)],
      secretWishText: secretWishText.trim() || data.secretWishText,
    };
    onSaveData(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
          aria-label="Close Customizer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-950 font-poppins">
              Surprise Customizer
            </h3>
            <p className="text-xs text-stone-500">
              Customize partner's name, message, and details instantly
            </p>
          </div>
        </div>

        {/* Tab toggle: Live Edit vs Code Guide */}
        <div className="flex rounded-lg bg-rose-50 p-1 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setShowCodeGuide(false)}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              !showCodeGuide ? 'bg-white text-rose-900 shadow-xs' : 'text-stone-600 hover:text-rose-900'
            }`}
          >
            Instant Live Preview
          </button>
          <button
            type="button"
            onClick={() => setShowCodeGuide(true)}
            className={`flex-1 py-1.5 rounded-md transition-colors ${
              showCodeGuide ? 'bg-white text-rose-900 shadow-xs' : 'text-stone-600 hover:text-rose-900'
            }`}
          >
            Code Guide (Kahan edit karein)
          </button>
        </div>

        {!showCodeGuide ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block font-medium text-stone-700 mb-1">
                  Age Milestone
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  placeholder="18"
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm font-bold text-rose-600"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-medium text-stone-700 mb-1">
                  Date of Birth (Countdown)
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Partner ka Naam
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Priya / Rahul / Jaan"
                className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Aapka Naam (Letter ke sign-off me dikhega)
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Aapka Humdum"
                className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Hero Subtitle (Hindi / Hinglish Romantic Quote)
              </label>
              <input
                type="text"
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Love Letter First Paragraph
              </label>
              <textarea
                rows={3}
                value={firstLetterPara}
                onChange={(e) => setFirstLetterPara(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Secret Wish Message (Modal popup me dikhega)
              </label>
              <textarea
                rows={2}
                value={secretWishText}
                onChange={(e) => setSecretWishText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500 text-sm resize-none"
              />
            </div>

            {/* Permanent Link to Send Banner */}
            <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200 flex items-center justify-between gap-2">
              <div className="text-[11px] text-rose-900">
                <span className="font-bold block">Permanent Link to Send Partner:</span>
                <span className="text-stone-500 truncate block max-w-[200px]">
                  {window.location.origin}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-3 py-1.5 bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-lg font-semibold flex items-center gap-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Test Fireworks Button */}
            <div className="flex items-center justify-between p-2.5 bg-amber-50/70 rounded-xl border border-amber-200/80">
              <span className="text-[11px] font-medium text-amber-900 flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5 text-amber-600" />
                <span>12:00 AM Patakhe & Celebration:</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  launchGrandBirthdayFireworks();
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-lg text-[11px] hover:shadow-xs cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-100" />
                <span>Test Patakhe! 🎆</span>
              </button>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium flex items-center gap-1.5 shadow-sm"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Apply Changes</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              <p className="font-semibold mb-1 flex items-center gap-1">
                <FileCode className="w-4 h-4 text-amber-600" /> File Guide: Kahan Kya Edit Karein?
              </p>
              <p>
                Sabhi text aur photos ko ek hi central jagah se control karne ke liye humne <strong>src/data/birthdayData.ts</strong> file banayi hai.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                <p className="font-bold text-rose-900 mb-0.5">1. Partner Ka Naam & Shayari:</p>
                <p className="text-stone-600">
                  Open karein <code>src/data/birthdayData.ts</code> aur change karein:
                  <br />
                  <span className="font-mono text-[11px] text-rose-700">partnerName: "Aapka Naam"</span>
                  <br />
                  <span className="font-mono text-[11px] text-rose-700">senderName: "Tumhara Humdum"</span>
                </p>
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                <p className="font-bold text-rose-900 mb-0.5">2. Photo Gallery Me Photos:</p>
                <p className="text-stone-600">
                  Aap card par bane <strong>"Add Partner Photo"</strong> button se direct apni phone/computer se image upload karke dekh sakte hain, ya <code>birthdayData.ts</code> me <code>imageUrl: "https://your-photo-url.jpg"</code> paste kar sakte hain.
                </p>
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                <p className="font-bold text-rose-900 mb-0.5">3. Background Romantic Music:</p>
                <p className="text-stone-600">
                  Top-right audio widget par click karke aap apna manpasand MP3 gaane ka link daal sakte hain. By default, soft romantic piano chords play hoti hain bina kisi internet audio error ke.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCodeGuide(false)}
              className="w-full py-2 bg-rose-600 text-white rounded-full font-medium"
            >
              Back to Live Editor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
