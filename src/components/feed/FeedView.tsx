import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SPECIALTY_CATEGORIES } from '../../data/mockData';
import { 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  PlusCircle, 
  Search, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

export const FeedView: React.FC = () => {
  const { 
    problems, 
    toggleSolidarity, 
    addComment, 
    role, 
    startChatWithCounselor, 
    counselors, 
    setIsShareModalOpen 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'p1': true // Expand first one by default to show interactivity
  });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const toggleCommentExpand = (problemId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent, problemId: string) => {
    e.preventDefault();
    const text = commentInputs[problemId]?.trim();
    if (!text) return;

    addComment(problemId, text);
    setCommentInputs(prev => ({ ...prev, [problemId]: '' }));
    setExpandedComments(prev => ({ ...prev, [problemId]: true }));
  };

  const filteredProblems = problems.filter((item) => {
    const matchesCategory = 
      selectedCategory === 'Hepsi' || item.category === selectedCategory;

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-blue-500/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-blue-50 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Dayanışma & Paylaşım Alanı</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Yalnız Değilsin: Ortak Dertler, Güçlü Bağlar
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Buradaki tüm dertler anonimleştirilerek paylaşılmıştır. Birbirimize destek olarak yükümüzü hafifletiyoruz.
            </p>
          </div>

          <button
            onClick={() => setIsShareModalOpen(true)}
            type="button"
            className="px-4 py-2.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shrink-0 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Sen de Derdini Paylaş</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
            {SPECIALTY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Akışta ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Problems Feed List */}
      <div className="space-y-4">
        {filteredProblems.map((problem) => {
          const isCommentsOpen = !!expandedComments[problem.id];
          const matchedCounselor = counselors.find(c => c.id === problem.matchedCounselorId);

          return (
            <article
              key={problem.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-blue-200 transition-all"
            >
              {/* Card Header: Author info & Category tag */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0">
                    {problem.authorAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">
                        {problem.authorName}
                      </span>
                      {problem.isAnonymized && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Anonimleştirildi</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{problem.createdAt}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700">
                  {problem.category}
                </span>
              </div>

              {/* Title & Body */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                {problem.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mb-4">
                {problem.content}
              </p>

              {/* Matched Counselor Recommendation Snippet */}
              {matchedCounselor && (
                <div className="mb-4 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={matchedCounselor.avatar}
                      alt={matchedCounselor.name}
                      className="w-9 h-9 rounded-xl object-cover border border-indigo-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-indigo-900 font-semibold truncate">
                        Önerilen Uzman: {matchedCounselor.name}
                      </p>
                      <p className="text-[11px] text-indigo-600 truncate">
                        {matchedCounselor.title}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => startChatWithCounselor(matchedCounselor, problem.title)}
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shrink-0 transition-colors shadow-2xs"
                  >
                    Danış
                  </button>
                </div>
              )}

              {/* Action Bar: Solidarity & Comments trigger */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                
                {/* Yalnız Değilsin (Dayanışma Butonu) */}
                <button
                  onClick={() => toggleSolidarity(problem.id)}
                  type="button"
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    problem.hasSolidarity
                      ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-102'
                      : 'bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 transition-transform ${problem.hasSolidarity ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
                  <span>Yalnız Değilsin</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-bold">
                    {problem.solidarityCount}
                  </span>
                </button>

                {/* Comments button */}
                <button
                  onClick={() => toggleCommentExpand(problem.id)}
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-50"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Destek Notları ({problem.comments.length})</span>
                  {isCommentsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Comments Section */}
              {isCommentsOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  
                  {/* Comments list */}
                  {problem.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-2">
                      Henüz destek notu bırakılmamış. İlk empati mesajını siz yazın!
                    </p>
                  ) : (
                    problem.comments.map((cm) => (
                      <div
                        key={cm.id}
                        className={`p-3 rounded-2xl text-xs ${
                          cm.isCounselorNote
                            ? 'bg-indigo-50/80 border border-indigo-200/80'
                            : 'bg-slate-50 border border-slate-200/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {cm.isCounselorNote ? (
                              <img
                                src={cm.authorAvatar}
                                alt={cm.authorName}
                                className="w-6 h-6 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="text-base">{cm.authorAvatar}</span>
                            )}
                            <span className="font-bold text-slate-900">{cm.authorName}</span>
                            {cm.isCounselorNote && (
                              <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold">
                                Uzman Danışman Notu
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{cm.createdAt}</span>
                        </div>

                        <p className="text-slate-700 leading-relaxed">{cm.content}</p>
                      </div>
                    ))
                  )}

                  {/* Add comment input */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, problem.id)}
                    className="flex items-center gap-2 pt-2"
                  >
                    <input
                      type="text"
                      placeholder={role === 'counselor' ? 'Uzman tavsiyesi veya destek notu bırakın...' : 'Empatik bir destek mesajı yazın...'}
                      value={commentInputs[problem.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [problem.id]: e.target.value })}
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[problem.id]?.trim()}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gönder</span>
                    </button>
                  </form>

                </div>
              )}

            </article>
          );
        })}
      </div>

    </div>
  );
};
