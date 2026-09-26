import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  UserRole, 
  CounselorProfile, 
  ClientProfile, 
  ProblemPost, 
  ChatMessage, 
  ActiveTab,
  CommentItem 
} from '../types';
import { 
  INITIAL_COUNSELORS, 
  INITIAL_PROBLEMS, 
  INITIAL_MESSAGES, 
  ANONYMOUS_ALIASES 
} from '../data/mockData';

interface AppContextType {
  role: UserRole | null;
  activeTab: ActiveTab;
  counselors: CounselorProfile[];
  currentCounselor: CounselorProfile;
  clientProfile: ClientProfile;
  problems: ProblemPost[];
  messages: ChatMessage[];
  activeChatCounselor: CounselorProfile | null;
  isChatOpen: boolean;
  isShareModalOpen: boolean;
  isEditProfileModalOpen: boolean;
  isProfileDetailModalOpen: boolean;
  selectedCounselorForDetail: CounselorProfile | null;
  
  // Actions
  loginAsClient: (alias?: string, avatar?: string) => void;
  loginAsCounselor: (counselorId?: string) => void;
  logout: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  toggleSolidarity: (problemId: string) => void;
  addProblem: (data: {
    title: string;
    content: string;
    category: ProblemPost['category'];
    isAnonymized: boolean;
    isAnonymous: boolean;
    matchedCounselorId?: string;
  }) => void;
  addComment: (problemId: string, content: string) => void;
  updateCounselorProfile: (data: Partial<CounselorProfile>) => void;
  sendMessage: (receiverId: string, text: string, problemRef?: string) => void;
  startChatWithCounselor: (counselor: CounselorProfile, problemRef?: string) => void;
  closeChat: () => void;
  setIsShareModalOpen: (open: boolean) => void;
  setIsEditProfileModalOpen: (open: boolean) => void;
  openCounselorDetail: (counselor: CounselorProfile) => void;
  closeCounselorDetail: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence via localStorage
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('pdr_role');
    return (saved as UserRole) || null;
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    const saved = localStorage.getItem('pdr_active_tab');
    return (saved as ActiveTab) || 'counseling'; // İlk ekran danışan-danışman iletişimi
  });

  const [counselors, setCounselors] = useState<CounselorProfile[]>(() => {
    const saved = localStorage.getItem('pdr_counselors');
    return saved ? JSON.parse(saved) : INITIAL_COUNSELORS;
  });

  const [currentCounselorId, setCurrentCounselorId] = useState<string>(() => {
    return localStorage.getItem('pdr_current_counselor_id') || 'c1';
  });

  const [clientProfile, setClientProfile] = useState<ClientProfile>(() => {
    const saved = localStorage.getItem('pdr_client_profile');
    if (saved) return JSON.parse(saved);
    const randomAlias = ANONYMOUS_ALIASES[Math.floor(Math.random() * ANONYMOUS_ALIASES.length)];
    return {
      id: 'client_me',
      name: randomAlias.name,
      alias: randomAlias.name,
      avatar: randomAlias.avatar,
      isAnonymous: true
    };
  });

  const [problems, setProblems] = useState<ProblemPost[]>(() => {
    const saved = localStorage.getItem('pdr_problems');
    return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('pdr_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Modal / Chat state
  const [activeChatCounselor, setActiveChatCounselor] = useState<CounselorProfile | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [selectedCounselorForDetail, setSelectedCounselorForDetail] = useState<CounselorProfile | null>(null);
  const [isProfileDetailModalOpen, setIsProfileDetailModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (role) localStorage.setItem('pdr_role', role);
    else localStorage.removeItem('pdr_role');
  }, [role]);

  useEffect(() => {
    localStorage.setItem('pdr_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('pdr_counselors', JSON.stringify(counselors));
  }, [counselors]);

  useEffect(() => {
    localStorage.setItem('pdr_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('pdr_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('pdr_client_profile', JSON.stringify(clientProfile));
  }, [clientProfile]);

  useEffect(() => {
    localStorage.setItem('pdr_current_counselor_id', currentCounselorId);
  }, [currentCounselorId]);

  const currentCounselor: CounselorProfile = counselors.find(c => c.id === currentCounselorId) || counselors[0] || INITIAL_COUNSELORS[0];

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
  };

  const loginAsClient = (alias?: string, avatar?: string) => {
    const chosenAlias = alias || clientProfile.alias;
    const chosenAvatar = avatar || clientProfile.avatar;
    setClientProfile(prev => ({
      ...prev,
      name: chosenAlias,
      alias: chosenAlias,
      avatar: chosenAvatar,
      isAnonymous: true
    }));
    setRole('client');
    setActiveTabState('counseling'); // İlk ekran: Danışan-Danışman İletişimi
  };

  const loginAsCounselor = (counselorId?: string) => {
    if (counselorId) {
      setCurrentCounselorId(counselorId);
    }
    setRole('counselor');
    setActiveTabState('counseling'); // İlk ekran: Danışan-Danışman İletişimi
  };

  const logout = () => {
    setRole(null);
    setIsChatOpen(false);
    setActiveChatCounselor(null);
  };

  const toggleSolidarity = (problemId: string) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const hasSolidarity = !p.hasSolidarity;
          return {
            ...p,
            hasSolidarity,
            solidarityCount: hasSolidarity ? p.solidarityCount + 1 : Math.max(0, p.solidarityCount - 1)
          };
        }
        return p;
      })
    );
  };

  const addProblem = (data: {
    title: string;
    content: string;
    category: ProblemPost['category'];
    isAnonymized: boolean;
    isAnonymous: boolean;
    matchedCounselorId?: string;
  }) => {
    const matchedCounselor = counselors.find(c => c.id === data.matchedCounselorId);
    const newProblem: ProblemPost = {
      id: `p_${Date.now()}`,
      authorId: clientProfile.id,
      authorName: data.isAnonymous ? clientProfile.alias : 'Danışan',
      authorAvatar: data.isAnonymous ? clientProfile.avatar : '👤',
      isAnonymous: data.isAnonymous,
      category: data.category,
      title: data.title,
      content: data.content,
      isAnonymized: data.isAnonymized,
      solidarityCount: 1,
      hasSolidarity: true,
      matchedCounselorId: data.matchedCounselorId,
      matchedCounselorName: matchedCounselor ? matchedCounselor.name : undefined,
      createdAt: 'Şimdi',
      comments: []
    };

    setProblems(prev => [newProblem, ...prev]);

    // If matched with counselor, auto simulate counselor connection notification/chat
    if (matchedCounselor) {
      setTimeout(() => {
        const welcomeText = `Merhaba, paylaştığınız "${data.title}" başlıklı durumunuzu inceledim. Bu süreçte hissettiklerinizi konuşmak için yanınızdayım. Ne zamandır bu hisle baş etmeye çalışıyorsunuz?`;
        setMessages(prev => [
          ...prev,
          {
            id: `m_${Date.now()}`,
            senderId: matchedCounselor.id,
            senderName: matchedCounselor.name,
            senderRole: 'counselor',
            receiverId: clientProfile.id,
            text: welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            problemRef: data.title
          }
        ]);
      }, 1500);
    }
  };

  const addComment = (problemId: string, content: string) => {
    const isCounselor = role === 'counselor';
    const newComment: CommentItem = {
      id: `cm_${Date.now()}`,
      authorName: isCounselor ? currentCounselor.name : clientProfile.alias,
      authorRole: role || 'client',
      authorTitle: isCounselor ? currentCounselor.title : undefined,
      authorAvatar: isCounselor ? currentCounselor.avatar : clientProfile.avatar,
      content,
      createdAt: 'Şimdi',
      isCounselorNote: isCounselor
    };

    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
  };

  const updateCounselorProfile = (data: Partial<CounselorProfile>) => {
    setCounselors(prev =>
      prev.map(c => {
        if (c.id === currentCounselorId) {
          return { ...c, ...data };
        }
        return c;
      })
    );
  };

  const sendMessage = (receiverId: string, text: string, problemRef?: string) => {
    const isCounselor = role === 'counselor';
    const senderId = isCounselor ? currentCounselor.id : clientProfile.id;
    const senderName = isCounselor ? currentCounselor.name : clientProfile.alias;

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId,
      senderName,
      senderRole: role || 'client',
      receiverId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      problemRef
    };

    setMessages(prev => [...prev, newMsg]);

    // If client sends message to a counselor, simulate warm response after 1.5s
    if (!isCounselor) {
      const partner = counselors.find(c => c.id === receiverId);
      if (partner) {
        setTimeout(() => {
          const autoReplies = [
            `Sizi çok iyi anlıyorum. Bu duyguları ifade edebilmeniz bile iyileşme yolunda çok kıymetli bir adım. Biraz daha detaylandırmak ister misiniz?`,
            `Paylaştığınız için teşekkür ederim. Bu durum günlük hayatınızda en çok hangi anlarda kendini hissettiriyor?`,
            `Bu hislerle baş etmek bazen yorucu olabilir. Yalnız olmadığınızı hatırlatmak isterim; adım adım birlikte bakacağız.`
          ];
          const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          setMessages(prev => [
            ...prev,
            {
              id: `m_${Date.now() + 1}`,
              senderId: partner.id,
              senderName: partner.name,
              senderRole: 'counselor',
              receiverId: clientProfile.id,
              text: randomReply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 1200);
      }
    }
  };

  const startChatWithCounselor = (counselor: CounselorProfile, problemRef?: string) => {
    setActiveChatCounselor(counselor);
    if (problemRef) {
      // If a problem title is passed, add an automated initial intro if not already sent
      const alreadyHasRef = messages.some(m => m.problemRef === problemRef);
      if (!alreadyHasRef) {
        sendMessage(counselor.id, `Merhaba, "${problemRef}" başlıklı konum hakkında görüşmek istiyorum.`, problemRef);
      }
    }
    setIsChatOpen(true);
  };


  const closeChat = () => {
    setIsChatOpen(false);
  };

  const openCounselorDetail = (counselor: CounselorProfile) => {
    setSelectedCounselorForDetail(counselor);
    setIsProfileDetailModalOpen(true);
  };

  const closeCounselorDetail = () => {
    setSelectedCounselorForDetail(null);
    setIsProfileDetailModalOpen(false);
  };

  const resetToDefaults = () => {
    setCounselors(INITIAL_COUNSELORS);
    setProblems(INITIAL_PROBLEMS);
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('pdr_counselors');
    localStorage.removeItem('pdr_problems');
    localStorage.removeItem('pdr_messages');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        activeTab,
        counselors,
        currentCounselor,
        clientProfile,
        problems,
        messages,
        activeChatCounselor,
        isChatOpen,
        isShareModalOpen,
        isEditProfileModalOpen,
        isProfileDetailModalOpen,
        selectedCounselorForDetail,
        loginAsClient,
        loginAsCounselor,
        logout,
        setActiveTab,
        toggleSolidarity,
        addProblem,
        addComment,
        updateCounselorProfile,
        sendMessage,
        startChatWithCounselor,
        closeChat,
        setIsShareModalOpen,
        setIsEditProfileModalOpen,
        openCounselorDetail,
        closeCounselorDetail,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
