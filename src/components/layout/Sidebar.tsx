import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  MessageSquare, 
  Users, 
  PlusCircle, 
  UserCog, 
  LogOut, 
  RotateCcw,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    role, 
    activeTab, 
    setActiveTab, 
    currentCounselor, 
    clientProfile, 
    logout, 
    setIsShareModalOpen, 
    setIsEditProfileModalOpen,
    resetToDefaults 
  } = useApp();

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 bg-white border-r border-slate-200/80 p-5 shrink-0 z-20 shadow-xs">
      
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 py-2 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">
            İçiniDök
          </h2>
          <span className="text-[11px] font-medium text-slate-400 block">
            Dayanışma & Danışmanlık
          </span>
        </div>
      </div>

      {/* Current User Card */}
      <div className="mb-6 p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl">
        <div className="flex items-center gap-3">
          {role === 'counselor' ? (
            <img
              src={currentCounselor.avatar}
              alt={currentCounselor.name}
              className="w-11 h-11 rounded-xl object-cover border border-indigo-200 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-2xl border border-blue-200 shrink-0">
              {clientProfile.avatar}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 text-sm truncate">
                {role === 'counselor' ? currentCounselor.name : clientProfile.alias}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`inline-block w-2 h-2 rounded-full ${role === 'counselor' ? 'bg-indigo-500' : 'bg-blue-500'}`} />
              <span className="text-xs text-slate-500 truncate">
                {role === 'counselor' ? currentCounselor.title : 'Anonim Danışan'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick action based on role */}
        {role === 'counselor' ? (
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            type="button"
            className="mt-3 w-full py-1.5 px-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-xs text-indigo-700 font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <UserCog className="w-3.5 h-3.5" />
            <span>Profilimi Düzenle</span>
          </button>
        ) : (
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Sparkles className="w-3 h-3" />
              Gizli & Güvenli Mod
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1.5 flex-1">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
          Sayfalar
        </div>

        {/* Tab 1: Danışan-Danışman İletişimi (Primary Tab) */}
        <button
          onClick={() => setActiveTab('counseling')}
          type="button"
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-medium text-sm transition-all text-left ${
            activeTab === 'counseling'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="block font-semibold">Danışmanlık & İletişim</span>
            <span className={`text-[11px] block truncate ${activeTab === 'counseling' ? 'text-blue-100' : 'text-slate-400'}`}>
              Buluşma, eşleşme & uzmanlar
            </span>
          </div>
        </button>

        {/* Tab 2: Dayanışma Akışı (Secondary Tab) */}
        <button
          onClick={() => setActiveTab('feed')}
          type="button"
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-medium text-sm transition-all text-left ${
            activeTab === 'feed'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="block font-semibold">Dayanışma Akışı</span>
            <span className={`text-[11px] block truncate ${activeTab === 'feed' ? 'text-blue-100' : 'text-slate-400'}`}>
              Paylaşılan dertler & destek
            </span>
          </div>
        </button>

        {/* Primary Action Button */}
        <div className="pt-4">
          <button
            onClick={() => setIsShareModalOpen(true)}
            type="button"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Derdini Anlat & Paylaş</span>
          </button>
        </div>

        {/* Desktop Swipe Info banner */}
        <div className="mt-4 p-3 rounded-2xl bg-blue-50/50 border border-blue-100/70 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold mb-1">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobil / PWA Özelliği</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Mobilde ekranı sağdan sola kaydırarak <strong>Dayanışma Akışı</strong>'na geçiş yapabilirsiniz.
          </p>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="pt-4 border-t border-slate-100 space-y-1">
        <button
          onClick={logout}
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Rol Değiştir / Çıkış</span>
        </button>

        <button
          onClick={() => {
            if (confirm('Tüm demo verileri (eklenen dertler, mesajlar) ilk haline sıfırlansın mı?')) {
              resetToDefaults();
            }
          }}
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Demo Verilerini Sıfırla</span>
        </button>
      </div>

    </aside>
  );
};
