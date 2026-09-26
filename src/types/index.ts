export type UserRole = 'client' | 'counselor';

export interface CounselorProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  specialties: string[];
  education: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  available: boolean;
  city: string;
  approach: string; // Terapi yaklaşımı (BDT, Varoluşçu vs.)
}

export interface ClientProfile {
  id: string;
  name: string;
  avatar: string;
  isAnonymous: boolean;
  alias: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorTitle?: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  isCounselorNote?: boolean;
}

export interface ProblemPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  isAnonymous: boolean;
  category: 'Kaygı & Stres' | 'Kariyer & Eğitim' | 'İlişkiler & Aile' | 'Yalnızlık & Uyum' | 'Öz Değer & Motivasyon' | 'Genel';
  title: string;
  content: string;
  isAnonymized: boolean;
  solidarityCount: number;
  hasSolidarity?: boolean;
  matchedCounselorId?: string;
  matchedCounselorName?: string;
  createdAt: string;
  comments: CommentItem[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  text: string;
  timestamp: string;
  problemRef?: string;
}

export type ActiveTab = 'counseling' | 'feed' | 'profile';
