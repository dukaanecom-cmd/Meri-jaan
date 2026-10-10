import React, { useState } from 'react';
import { Heart, Camera, Upload, Eye, Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { MemoryPhoto } from '../data/birthdayData';

interface GallerySectionProps {
  photos: MemoryPhoto[];
  onUpdatePhoto: (id: number, newUrl: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos, onUpdatePhoto }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [editingPhotoId, setEditingPhotoId] = useState<number | null>(null);
  const [tempUrl, setTempUrl] = useState('');

  // Fallback romantic SVG illustrations for each memory card
  const getMemoryIllustration = (id: number, accentColor: string) => {
    switch (id) {
      case 1:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 text-rose-700">
            <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
              <Heart className="w-10 h-10 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <p className="font-handwriting text-2xl font-bold">First Sight</p>
            <p className="text-xs text-rose-600 mt-1 opacity-80">Cafe Table & Warm Smiles</p>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-100 via-rose-50 to-pink-200 text-rose-800">
            <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
              <Sparkles className="w-10 h-10 text-amber-500 fill-amber-300" />
            </div>
            <p className="font-handwriting text-2xl font-bold">Sunset Walks</p>
            <p className="text-xs text-rose-600 mt-1 opacity-80">Golden Hour Together</p>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-rose-200 text-purple-800">
            <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
              <Camera className="w-10 h-10 text-purple-500" />
            </div>
            <p className="font-handwriting text-2xl font-bold">Laughs & Roadtrips</p>
            <p className="text-xs text-purple-600 mt-1 opacity-80">Unfiltered Pure Joy</p>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 via-rose-100 to-amber-200 text-amber-900">
            <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
              <Sparkles className="w-10 h-10 text-rose-500" />
            </div>
            <p className="font-handwriting text-2xl font-bold">Candlelight Glow</p>
            <p className="text-xs text-rose-700 mt-1 opacity-80">Dinner & Soft Music</p>
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-pink-50 to-rose-100 text-rose-800">
            <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
              <Heart className="w-10 h-10 fill-pink-400 text-pink-400" />
            </div>
            <p className="font-handwriting text-2xl font-bold">Cute Moments</p>
            <p className="text-xs text-rose-600 mt-1 opacity-80">Nakhre & Sweet Talks</p>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-200 via-pink-100 to-red-100 text-red-800">
            <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-3">
              <Heart className="w-10 h-10 fill-red-600 text-red-600" />
            </div>
            <p className="font-handwriting text-2xl font-bold">Forever & Ever</p>
            <p className="text-xs text-red-600 mt-1 opacity-80">To Eternity & Beyond</p>
          </div>
        );
    }
  };

  const handleFileUpload = (photoId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdatePhoto(photoId, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUrl = (photoId: number) => {
    if (tempUrl.trim()) {
      onUpdatePhoto(photoId, tempUrl.trim());
      setEditingPhotoId(null);
      setTempUrl('');
    }
  };

  return (
    <section id="memory-lane" className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-[#FFF9F9] via-[#FFF0F4] to-[#FFF9F9]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="font-script text-3xl sm:text-4xl text-rose-500 mb-1">
            Cherished Memories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 font-poppins">
            Hamare Pyare Lamhe (Memory Lane)
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Hover or click any memory to relive the moment. You can also upload your partner's actual photos directly!
          </p>

          {/* View Mode Toggle: Grid vs Carousel */}
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-full border border-rose-200 shadow-sm mt-6">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                viewMode === 'grid'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-stone-600 hover:text-rose-900'
              }`}
            >
              Polaroid Grid
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                viewMode === 'carousel'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-stone-600 hover:text-rose-900'
              }`}
            >
              Slideshow Carousel
            </button>
          </div>
        </div>

        {/* ─── VIEW 1: POLAROID GRID ───────────────────────────────────── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl p-4 border border-rose-150 shadow-md shadow-rose-950/5 hover:shadow-2xl hover:shadow-rose-400/20 transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Photo Frame Container with Zoom & Glow */}
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-rose-50 border border-rose-100 group-hover:ring-2 group-hover:ring-rose-300 transition-all">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    getMemoryIllustration(item.id, item.accentColor)
                  )}

                  {/* Top Badge: Date */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-medium text-rose-900 shadow-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-rose-500" />
                    <span>{item.date}</span>
                  </div>

                  {/* Quick Action Overlay (View Full / Change Photo) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                    <button
                      onClick={() => setSelectedPhoto(item)}
                      className="p-2.5 rounded-full bg-white text-rose-700 hover:bg-rose-50 shadow-md transition-transform hover:scale-110"
                      title="View Full Memory"
                      aria-label="View Memory"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <label
                      className="p-2.5 rounded-full bg-white text-rose-700 hover:bg-rose-50 shadow-md transition-transform hover:scale-110 cursor-pointer"
                      title="Upload Your Photo"
                    >
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(item.id, e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Caption / Details */}
                <div className="pt-4 pb-2 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-rose-400 mb-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      <span>Memory #{item.id}</span>
                    </div>
                    <h3 className="font-handwriting text-2xl text-rose-950 font-bold group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-3">
                      {item.caption}
                    </p>
                  </div>

                  {/* Direct Change Button (Very user-friendly!) */}
                  <div className="mt-3 pt-3 border-t border-rose-100/80 flex items-center justify-between">
                    <label className="text-[11px] text-rose-600 hover:text-rose-800 font-medium cursor-pointer flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      <span>{item.imageUrl ? 'Change Photo' : 'Add Partner Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(item.id, e)}
                      />
                    </label>

                    <button
                      onClick={() => {
                        setEditingPhotoId(item.id);
                        setTempUrl(item.imageUrl);
                      }}
                      className="text-[11px] text-stone-400 hover:text-stone-700 underline"
                    >
                      Paste URL
                    </button>
                  </div>
                </div>

                {/* Inline URL Input Modal/Popover if editing */}
                {editingPhotoId === item.id && (
                  <div className="absolute inset-x-2 bottom-2 bg-white p-3 rounded-xl shadow-xl border border-rose-300 z-20 text-xs">
                    <p className="font-semibold text-rose-900 mb-1">Enter Image URL:</p>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      className="w-full px-2 py-1 rounded border border-rose-200 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-rose-400"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setEditingPhotoId(null)}
                        className="px-2 py-0.5 text-stone-500 hover:text-stone-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveUrl(item.id)}
                        className="px-2.5 py-0.5 bg-rose-600 text-white rounded font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── VIEW 2: CAROUSEL / SLIDESHOW ────────────────────────────── */}
        {viewMode === 'carousel' && (
          <div className="relative max-w-3xl mx-auto bg-white rounded-3xl p-4 sm:p-6 border border-rose-200 shadow-xl shadow-rose-950/5">
            <div className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-rose-50">
              {photos[carouselIndex].imageUrl ? (
                <img
                  src={photos[carouselIndex].imageUrl}
                  alt={photos[carouselIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                getMemoryIllustration(photos[carouselIndex].id, photos[carouselIndex].accentColor)
              )}

              {/* Navigation Arrows */}
              <button
                onClick={() => setCarouselIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-rose-800 hover:bg-white shadow-md transition-transform hover:scale-105"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCarouselIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-rose-800 hover:bg-white shadow-md transition-transform hover:scale-105"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Carousel Caption Details */}
            <div className="mt-5 text-center px-4">
              <span className="text-xs text-rose-500 font-semibold tracking-wider uppercase">
                {photos[carouselIndex].date} · {photos[carouselIndex].location}
              </span>
              <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-950 font-bold mt-1">
                {photos[carouselIndex].title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
                {photos[carouselIndex].caption}
              </p>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === carouselIndex ? 'w-6 bg-rose-600' : 'w-2 bg-rose-200'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 overflow-hidden shadow-2xl relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-16/10 rounded-2xl overflow-hidden bg-rose-50 mb-4">
              {selectedPhoto.imageUrl ? (
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                getMemoryIllustration(selectedPhoto.id, selectedPhoto.accentColor)
              )}
            </div>
            <div className="text-left">
              <div className="flex items-center justify-between text-xs text-rose-500 mb-1">
                <span>{selectedPhoto.date} · {selectedPhoto.location}</span>
                <span>Special Memory</span>
              </div>
              <h3 className="font-handwriting text-3xl text-rose-900 font-bold">
                {selectedPhoto.title}
              </h3>
              <p className="text-stone-700 text-sm mt-2 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="mt-6 w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium text-sm transition-colors"
            >
              Close Memory
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
