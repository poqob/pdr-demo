import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SPECIALTY_CATEGORIES } from '../../data/mockData';
import { 
  Sparkles, 
  MessageCircle, 
  Search, 
  PlusCircle, 
  UserCog, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const CounselingHub: React.FC = () => {
  const { 
    role, 
    counselors, 
    currentCounselor, 
    startChatWithCounselor, 
    openCounselorDetail, 
    setIsShareModalOpen, 
    setIsEditProfileModalOpen,
    messages
  } = useApp();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Hepsi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter counselors
  const filteredCounselors = counselors.filter((c) => {
    const matchesCategory = 
      selectedSpecialty === 'Hepsi' || 
      c.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Recent chat conversations
  const recentChatCounselorIds = Array.from(new Set(
    messages
      .filter(m => (role === 'counselor' ? m.receiverId === currentCounselor.id || m.senderId === currentCounselor.id : true))
      .map(m => (m.senderRole === 'counselor' ? m.senderId : m.receiverId))
  ));

  const recentCounselors = counselors.filter(c => recentChatCounselorIds.includes(c.id));

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Role-Specific Hero Banner */}
      {role === 'client' ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-medium text-blue-50 mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Güvenli & Empatik İletişim Alanı</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
              Derdini Anlat, Doğru Uzmanla Buluş
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              İster anonim olarak hemen bir uzman danışmanla özel sohbete başla, ister derdini akıllıca anonimleştirip dayanışma akışında paylaşarak diğer danışanlarla güç bul.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsShareModalOpen(true)}
                type="button"
                className="px-5 py-3 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <span>Hemen Dert Anlat & Eşleş</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>%100 Gizli • Gerçek Danışmanlar</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Counselor View Hero */
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-500/10">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentCounselor.avatar}
                alt={currentCounselor.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium text-purple-100 mb-1">
                  <span>Danışman Paneli</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Hoş Geldiniz, {currentCounselor.name}
                </h1>
                <p className="text-purple-200 text-xs sm:text-sm mt-0.5">
                  {currentCounselor.title} • {currentCounselor.city}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              type="button"
              className="px-4 py-2.5 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shrink-0 transition-transform active:scale-95"
            >
              <UserCog className="w-4 h-4" />
              <span>Profilimi Düzenle / Yarat</span>
            </button>
          </div>
        </div>
      )}

      {/* Active / Ongoing Conversations */}
      {recentCounselors.length > 0 && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                Görüşmeleriniz ({recentCounselors.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentCounselors.map((c) => {
              const lastMsg = [...messages]
                .reverse()
                .find(m => m.senderId === c.id || m.receiverId === c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => startChatWithCounselor(c)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 cursor-pointer transition-all"
                >
                  <div className="relative">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900 text-sm truncate">{c.name}</p>
                      {lastMsg && (
                        <span className="text-[10px] text-slate-400">{lastMsg.timestamp}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : c.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Search & Categories Filter */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Uzman Danışman Kadromuz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Dilediğiniz uzmanı seçip anında birebir güvenli mesajlaşma başlatabilirsiniz.
            </p>
          </div>

          {/* Search box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Uzman, unvan veya konu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SPECIALTY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSpecialty(cat)}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedSpecialty === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Counselors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCounselors.map((counselor) => (
          <div
            key={counselor.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                  />
                  {counselor.available ? (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                    </span>
                  ) : (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-300 border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">
                      {counselor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                      <span>★ {counselor.rating}</span>
                      <span className="text-slate-400">({counselor.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-indigo-600 font-medium mt-0.5">
                    {counselor.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <span>{counselor.city}</span> • <span>{counselor.experienceYears} yıl deneyim</span>
                  </p>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                {counselor.bio}
              </p>

              {/* Education snippet */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{counselor.education}</span>
              </div>

              {/* Specialties tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {counselor.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => openCounselorDetail(counselor)}
                type="button"
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-colors text-center"
              >
                Profili İncele
              </button>

              <button
                onClick={() => startChatWithCounselor(counselor)}
                type="button"
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Mesaj Başlat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
