import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, MessageCircle, Star, GraduationCap, MapPin, Compass } from 'lucide-react';

export const CounselorDetailModal: React.FC = () => {
  const { 
    isProfileDetailModalOpen, 
    closeCounselorDetail, 
    selectedCounselorForDetail, 
    startChatWithCounselor 
  } = useApp();

  if (!isProfileDetailModalOpen || !selectedCounselorForDetail) return null;

  const counselor = selectedCounselorForDetail;

  const handleStartChat = () => {
    closeCounselorDetail();
    startChatWithCounselor(counselor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header background with close button */}
        <div className="relative h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4">
          <button
            onClick={closeCounselorDetail}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 pt-0 flex-1 overflow-y-auto">
          {/* Avatar and basic info */}
          <div className="relative -mt-12 mb-4 flex items-end justify-between">
            <div className="relative">
              <img
                src={counselor.avatar}
                alt={counselor.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
              />
              {counselor.available && (
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
              )}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{counselor.rating}</span>
              <span className="text-slate-400 font-normal">({counselor.reviewCount} değerlendirme)</span>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">{counselor.name}</h2>
            <p className="text-sm font-semibold text-indigo-600">{counselor.title}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{counselor.city}</span>
              <span>•</span>
              <span>{counselor.experienceYears} Yıl Klinik Deneyim</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Uzmanlık Alanları
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {counselor.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-2.5 py-1 rounded-xl text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Hakkında
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {counselor.bio}
            </p>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Eğitim Geçmişi</span>
            </h4>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {counselor.education}
            </p>
          </div>

          {/* Approach */}
          {counselor.approach && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Terapi Yaklaşımı</span>
              </h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {counselor.approach}
              </p>
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={handleStartChat}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{counselor.name} ile Mesajlaşmaya Başla</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
