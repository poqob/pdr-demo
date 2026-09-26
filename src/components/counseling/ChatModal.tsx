import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, Shield, CheckCheck } from 'lucide-react';

export const ChatModal: React.FC = () => {
  const { 
    isChatOpen, 
    closeChat, 
    activeChatCounselor, 
    messages, 
    sendMessage, 
    role, 
    clientProfile, 
    currentCounselor 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  if (!isChatOpen || !activeChatCounselor) return null;

  const partner = activeChatCounselor;
  const isCounselor = role === 'counselor';

  // Filter messages between current user and partner
  const chatMessages = messages.filter((m) => {
    if (isCounselor) {
      return (m.senderId === currentCounselor.id && m.receiverId === partner.id) ||
             (m.senderId === partner.id && m.receiverId === currentCounselor.id) ||
             // or demo fallback
             (m.senderId === partner.id || m.receiverId === partner.id);
    } else {
      return (m.senderId === clientProfile.id && m.receiverId === partner.id) ||
             (m.senderId === partner.id && m.receiverId === clientProfile.id);
    }
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    sendMessage(partner.id, inputVal.trim());
    setInputVal('');
  };

  const quickPrompts = [
    'Son zamanlarda uyku problemi ve sürekli kaygı yaşıyorum.',
    'İş yerindeki tükenmişlik hissim giderek artıyor.',
    'Kendimi çok yalnız hissediyorum, konuşmaya ihtiyacım var.',
    'Görüşme için uygun olduğunuz saatler nelerdir?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[85vh] sm:h-[750px] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={partner.avatar}
                alt={partner.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {partner.name}
                </h3>
              </div>
              <p className="text-xs text-indigo-600 font-medium">
                {partner.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-[11px] font-semibold border border-emerald-200/50">
              <Shield className="w-3 h-3" />
              <span>Uçtan Uca Güvenli</span>
            </div>

            <button
              onClick={closeChat}
              className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/50">
          
          <div className="text-center my-2">
            <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-400 font-medium shadow-2xs">
              🔒 Bu sohbet gizli ve güvenli alandadır
            </span>
          </div>

          {chatMessages.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="font-semibold text-slate-800 text-sm">Görüşmeyi Başlatın</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                {partner.name} sizinle konuşmaya hazır. Aşağıdaki hazır başlıklardan birine basabilir veya kendi cümlenizle başlayabilirsiniz.
              </p>
            </div>
          ) : (
            chatMessages.map((msg) => {
              const isMine = isCounselor 
                ? msg.senderRole === 'counselor' 
                : msg.senderRole === 'client';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender name snippet */}
                  <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                    {msg.senderName}
                  </span>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs ${
                      isMine
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    {/* Optional problem reference */}
                    {msg.problemRef && (
                      <div className={`text-[11px] pb-1.5 mb-1.5 border-b font-medium ${
                        isMine ? 'border-blue-400/50 text-blue-100' : 'border-slate-100 text-indigo-600'
                      }`}>
                        Konu: "{msg.problemRef}"
                      </div>
                    )}

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMine ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      <span>{msg.timestamp}</span>
                      {isMine && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts (Danışan için) */}
        {!isCounselor && (
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputVal(prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[11px] whitespace-nowrap transition-colors border border-slate-200/60"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder={isCounselor ? "Danışanınıza empatik bir yanıt yazın..." : "Hissettiklerinizi buraya yazın..."}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-hidden transition-colors"
          />

          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
