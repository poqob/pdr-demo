import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Users, PlusCircle, UserCircle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsShareModalOpen, 
    role, 
    setIsEditProfileModalOpen 
  } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      
      {/* Tab 1: Danışmanlık */}
      <button
        onClick={() => setActiveTab('counseling')}
        type="button"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
          activeTab === 'counseling' ? 'text-blue-600 font-semibold' : 'text-slate-500'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">İletişim</span>
      </button>

      {/* Central Share Button */}
      <button
        onClick={() => setIsShareModalOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
          <PlusCircle className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-semibold text-blue-600 mt-0.5">Dert Anlat</span>
      </button>

      {/* Tab 2: Akış */}
      <button
        onClick={() => setActiveTab('feed')}
        type="button"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
          activeTab === 'feed' ? 'text-blue-600 font-semibold' : 'text-slate-500'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px]">Akış</span>
      </button>

      {/* Profile / Edit */}
      {role === 'counselor' ? (
        <button
          onClick={() => setIsEditProfileModalOpen(true)}
          type="button"
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-500 hover:text-indigo-600"
        >
          <UserCircle className="w-5 h-5" />
          <span className="text-[10px]">Profilim</span>
        </button>
      ) : null}

    </nav>
  );
};
