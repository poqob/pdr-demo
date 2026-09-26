import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const { role, activeTab, setActiveTab, logout } = useApp();

  return (
    <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top bar with brand & logout */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-base">İçiniDök</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
            {role === 'counselor' ? 'Danışman' : 'Danışan'}
          </span>
        </div>

        <button
          onClick={logout}
          type="button"
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 py-1 px-2 rounded-lg bg-slate-100"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Çıkış</span>
        </button>
      </div>

      {/* Swipeable Tabs Switcher Bar */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('counseling')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'counseling'
                ? 'bg-white text-blue-600 shadow-xs font-semibold'
                : 'text-slate-600'
            }`}
          >
            <span>💬 Danışmanlık</span>
            {activeTab === 'counseling' && <ChevronRight className="w-3 h-3 text-blue-400 animate-pulse" />}
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-white text-blue-600 shadow-xs font-semibold'
                : 'text-slate-600'
            }`}
          >
            {activeTab === 'feed' && <ChevronLeft className="w-3 h-3 text-blue-400 animate-pulse" />}
            <span>🌊 Dayanışma Akışı</span>
          </button>
        </div>

        {/* Swipe hint */}
        <div className="text-[10px] text-center text-slate-400 mt-1 flex items-center justify-center gap-1">
          <span>👈 Ekranı sağa/sola kaydırarak geçiş yapabilirsiniz 👉</span>
        </div>
      </div>
    </header>
  );
};
