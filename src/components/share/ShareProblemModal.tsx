import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { anonymizeProblemText, detectCategory } from '../../utils/anonymizer';
import { SPECIALTY_CATEGORIES } from '../../data/mockData';
import type { ProblemPost } from '../../types';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Stethoscope, 
  CheckCircle2
} from 'lucide-react';

export const ShareProblemModal: React.FC = () => {
  const { 
    isShareModalOpen, 
    setIsShareModalOpen, 
    addProblem, 
    counselors, 
    startChatWithCounselor,
    setActiveTab
  } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ProblemPost['category']>('Kaygı & Stres');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [matchedCounselorId, setMatchedCounselorId] = useState(counselors[0]?.id || 'c1');
  
  // Anonymization preview state
  const [previewAnonymized, setPreviewAnonymized] = useState(false);
  const [anonymizedResult, setAnonymizedResult] = useState<{ anonymizedText: string; detectedEntities: string[] }>({
    anonymizedText: '',
    detectedEntities: []
  });

  // Auto-detect category & suggest counselor when content changes
  useEffect(() => {
    if (content.length > 15) {
      const detected = detectCategory(content);
      setCategory(detected);

      // Match a counselor that has this specialty
      const matched = counselors.find(c => c.specialties.includes(detected)) || counselors[0];
      if (matched) {
        setMatchedCounselorId(matched.id);
      }
    }
  }, [content, counselors]);

  // Update anonymization when toggled or content changed
  const handleTriggerAnonymize = () => {
    if (!content.trim()) return;
    const res = anonymizeProblemText(content);
    setAnonymizedResult(res);
    setPreviewAnonymized(true);
  };

  if (!isShareModalOpen) return null;

  const handleSubmitToFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const finalContent = previewAnonymized ? anonymizedResult.anonymizedText : content;

    addProblem({
      title: title.trim(),
      content: finalContent.trim(),
      category,
      isAnonymized: previewAnonymized || isAnonymous,
      isAnonymous,
      matchedCounselorId
    });

    setIsShareModalOpen(false);
    // Switch to feed view so user sees their post
    setActiveTab('feed');
  };

  const handleDirectChat = () => {
    if (!title.trim() || !content.trim()) return;
    const selectedCounselor = counselors.find(c => c.id === matchedCounselorId);
    if (!selectedCounselor) return;

    const finalContent = previewAnonymized ? anonymizedResult.anonymizedText : content;

    setIsShareModalOpen(false);
    startChatWithCounselor(selectedCounselor, `${title}: ${finalContent.substring(0, 80)}...`);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Güvenli & Empatik Alan</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Derdini Anlat & Paylaş
            </h2>
          </div>

          <button
            onClick={() => setIsShareModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitToFeed} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Derdinize Kısa Bir Başlık Verin
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Gece başlayan anksiyete nöbetleri ve sınav stresi..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Neler Yaşıyorsunuz? (Derdinizi Dökün)
              </label>
              <button
                type="button"
                onClick={handleTriggerAnonymize}
                disabled={!content.trim()}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-40 flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Akıllı Anonimleştir</span>
              </button>
            </div>

            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (previewAnonymized) setPreviewAnonymized(false);
              }}
              placeholder="Aklınızdan ve kalbinizden geçen her şeyi serbestçe yazabilirsiniz. Kimse sizi yargılamayacak..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden resize-none"
            />
          </div>

          {/* Anonymization Preview Box */}
          {previewAnonymized && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Hassas Veriler Anonimleştirildi
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewAnonymized(false)}
                  className="text-emerald-700 hover:underline"
                >
                  Orijinale Dön
                </button>
              </div>

              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 font-mono text-[11px] text-slate-700 leading-relaxed">
                {anonymizedResult.anonymizedText}
              </div>

              {anonymizedResult.detectedEntities.length > 0 && (
                <div className="text-[10px] text-emerald-700">
                  Filtrelenen öğeler: {anonymizedResult.detectedEntities.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Category selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Konu / Kategori
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SPECIALTY_CATEGORIES.filter(c => c !== 'Hepsi').map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat as ProblemPost['category'])}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                    category === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Matched Counselor Recommendation */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Eşleşen / İlgili Uzman Danışman
            </label>
            <div className="space-y-1.5">
              {counselors.map((c) => {
                const isSelected = matchedCounselorId === c.id;
                const isExpertInCategory = c.specialties.includes(category);

                return (
                  <div
                    key={c.id}
                    onClick={() => setMatchedCounselorId(c.id)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-9 h-9 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-slate-900 text-xs truncate">{c.name}</p>
                          {isExpertInCategory && (
                            <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                              Önerilen
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{c.title}</p>
                      </div>
                    </div>

                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Anonymous toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  Anonim Paylaşım
                </span>
                <span className="text-[10px] text-slate-500">
                  Gerçek kimliğiniz asla gösterilmez, takma ad kullanılır.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDirectChat}
              disabled={!title.trim() || !content.trim()}
              className="py-3 px-4 rounded-2xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition-colors"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Sadece Danışmanla Konuş</span>
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-40 shadow-lg shadow-blue-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Dayanışma Akışında Paylaş</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
