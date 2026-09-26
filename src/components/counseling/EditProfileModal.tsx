import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, GraduationCap, MapPin } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
];

const AVAILABLE_SPECIALTIES = [
  'Kaygı & Stres',
  'Kariyer & Eğitim',
  'İlişkiler & Aile',
  'Yalnızlık & Uyum',
  'Öz Değer & Motivasyon',
  'Panik Atak',
  'Tükenmişlik (Burnout)',
  'Öfke Kontrolü',
  'Sınav Kaygısı',
  'Travma & Yas'
];

export const EditProfileModal: React.FC = () => {
  const { isEditProfileModalOpen, setIsEditProfileModalOpen, currentCounselor, updateCounselorProfile } = useApp();

  const [name, setName] = useState(currentCounselor.name);
  const [title, setTitle] = useState(currentCounselor.title);
  const [avatar, setAvatar] = useState(currentCounselor.avatar);
  const [bio, setBio] = useState(currentCounselor.bio);
  const [education, setEducation] = useState(currentCounselor.education);
  const [approach, setApproach] = useState(currentCounselor.approach);
  const [city, setCity] = useState(currentCounselor.city);
  const [specialties, setSpecialties] = useState<string[]>(currentCounselor.specialties);
  const [showCustomAvatarInput, setShowCustomAvatarInput] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  useEffect(() => {
    if (currentCounselor) {
      setName(currentCounselor.name);
      setTitle(currentCounselor.title);
      setAvatar(currentCounselor.avatar);
      setBio(currentCounselor.bio);
      setEducation(currentCounselor.education);
      setApproach(currentCounselor.approach);
      setCity(currentCounselor.city);
      setSpecialties(currentCounselor.specialties || []);
    }
  }, [currentCounselor, isEditProfileModalOpen]);

  if (!isEditProfileModalOpen) return null;

  const handleToggleSpecialty = (spec: string) => {
    if (specialties.includes(spec)) {
      setSpecialties(specialties.filter(s => s !== spec));
    } else {
      setSpecialties([...specialties, spec]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCounselorProfile({
      name: name.trim() || currentCounselor.name,
      title: title.trim() || 'Psikolojik Danışman',
      avatar,
      bio: bio.trim(),
      education: education.trim(),
      approach: approach.trim(),
      city: city.trim(),
      specialties
    });
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Danışman Profilini Düzenle / Yarat
            </h2>
            <p className="text-xs text-slate-500">
              Bilgileriniz danışanlara gösterilir (Tüm alanlar opsiyoneldir).
            </p>
          </div>
          <button
            onClick={() => setIsEditProfileModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Avatar Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Profil Görseli
            </label>
            <div className="flex items-center gap-4 mb-3">
              <img
                src={avatar}
                alt="Seçili Avatar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-xs"
              />
              <div className="space-y-1">
                <p className="text-xs text-slate-600 font-medium">Hazır avatarlardan seçin veya URL girin</p>
                <button
                  type="button"
                  onClick={() => setShowCustomAvatarInput(!showCustomAvatarInput)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  {showCustomAvatarInput ? 'Hazır avatarları göster' : 'Özel görsel bağlantısı (URL) ekle'}
                </button>
              </div>
            </div>

            {showCustomAvatarInput ? (
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://... resim linki"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customAvatarUrl) {
                      setAvatar(customAvatarUrl);
                      setShowCustomAvatarInput(false);
                    }
                  }}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  Uygula
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-transform shrink-0 ${
                      avatar === url ? 'border-indigo-600 scale-105' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${idx}`} className="w-12 h-12 object-cover" />
                    {avatar === url && (
                      <span className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Uzm. Psk. Can Demir"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Unvan
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Klinik Psikolog, PDR Uzmanı"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* City / Work Mode */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Konum / Çalışma Şekli
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Örn: İstanbul (Online / Yüz Yüze)"
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Biyografi / Hakkında (Bio)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Danışanlarınıza kendinizi, çalışma felsefenizi ve nasıl yardımcı olabileceğinizi anlatın..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-hidden resize-none"
            />
          </div>

          {/* Specialties Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Uzmanlık Alanları
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SPECIALTIES.map((spec) => {
                const isSelected = specialties.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleToggleSpecialty(spec)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? `✓ ${spec}` : `+ ${spec}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Eğitim Geçmişi & Sertifikalar
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Örn: Boğaziçi Üniv. Psikoloji (Lisans) • ODTÜ Klinik Psikoloji (Y.L.)"
                className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Approach */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Terapi / Danışmanlık Yaklaşımı
            </label>
            <input
              type="text"
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              placeholder="Örn: Bilişsel Davranışçı Terapi (BDT), Kabul ve Kararlılık (ACT)"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditProfileModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20"
            >
              Profili Kaydet
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
