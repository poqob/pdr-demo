import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ANONYMOUS_ALIASES } from '../../data/mockData';
import { 
  HeartHandshake, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Stethoscope,
  ArrowRight,
  Info
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginAsClient, loginAsCounselor, counselors } = useApp();
  
  const [selectedAliasIndex, setSelectedAliasIndex] = useState(0);
  const [selectedCounselorId, setSelectedCounselorId] = useState(counselors[0]?.id || 'c1');
  const [activeTab, setActiveTab] = useState<'client' | 'counselor'>('client');

  const currentAlias = ANONYMOUS_ALIASES[selectedAliasIndex];

  const handleNextAlias = () => {
    setSelectedAliasIndex((prev) => (prev + 1) % ANONYMOUS_ALIASES.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-blue-500/5 border border-blue-100 overflow-hidden">
        
        {/* Header / Brand */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-400/20 rounded-full blur-lg pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-3 shadow-inner">
            <HeartHandshake className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            İçiniDök
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-md mx-auto">
            Güvenli Alan, Anonim Dert Paylaşımı ve Uzman Danışmanlık Dayanışma Platformu
          </p>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium text-blue-50 mt-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Frontend Demo Sürümü • Şifresiz Hızlı Giriş</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
            <button
              onClick={() => setActiveTab('client')}
              type="button"
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'client'
                  ? 'bg-white text-blue-600 shadow-sm shadow-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Danışan Girişi</span>
            </button>
            <button
              onClick={() => setActiveTab('counselor')}
              type="button"
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'counselor'
                  ? 'bg-white text-indigo-600 shadow-sm shadow-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Danışman Girişi</span>
            </button>
          </div>

          {/* Client Tab Content */}
          {activeTab === 'client' ? (
            <div className="space-y-6">
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold block mb-0.5">Tamamen Güvenli & Anonim</strong>
                    Danışan olarak derdinizi anlatabilir, uzman danışmanla özel mesajlaşabilir veya dilerseniz anonimleştirerek dayanışma akışında paylaşabilirsiniz.
                  </div>
                </div>
              </div>

              {/* Alias Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Demo Anonim Profiliniz
                  </label>
                  <button
                    onClick={handleNextAlias}
                    type="button"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Farklı İsim Üret
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-1 bg-white rounded-xl shadow-xs border border-slate-100">
                      {currentAlias.avatar}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm sm:text-base">
                        {currentAlias.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Toplulukta bu sevimli anonim isimle görüneceksiniz
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={() => loginAsClient(currentAlias.name, currentAlias.avatar)}
                type="button"
                className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Danışan Olarak Başla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Counselor Tab Content */
            <div className="space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold block mb-0.5">Uzman Danışman Rolü</strong>
                    Danışmanlar kendi profillerini (görsel, bio, uzmanlık, eğitim) özgürce yaratabilir, danışanların dertlerini dinleyip rehberlik edebilirler.
                  </div>
                </div>
              </div>

              {/* Select Counselor Profile */}
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                  Giriş Yapılacak Uzman Profili Seçin
                </label>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {counselors.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCounselorId(c.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        selectedCounselorId === c.id
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 text-sm truncate">{c.name}</p>
                          <span className="text-xs text-amber-600 font-medium">★ {c.rating}</span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{c.title}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedCounselorId === c.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                      }`}>
                        {selectedCounselorId === c.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Counselor Login Button */}
              <button
                onClick={() => loginAsCounselor(selectedCounselorId)}
                type="button"
                className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Danışman Olarak Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick info note */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5" />
            <span>Giriş yaptıktan sonra sol menüden istediğiniz an rol değiştirebilirsiniz.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
