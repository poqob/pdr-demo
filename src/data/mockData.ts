import type { CounselorProfile, ProblemPost, ChatMessage } from '../types';

export const INITIAL_COUNSELORS: CounselorProfile[] = [
  {
    id: 'c1',
    name: 'Uzm. Psk. Melis Kaya',
    title: 'Klinik Psikolog & Yetişkin Terapisti',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    bio: 'Yetişkinlerde anksiyete, panik atak, mükemmeliyetçilik ve ilişki dinamikleri üzerine Bilişsel Davranışçı Terapi (BDT) odaklı çalışıyorum. Birlikte güvenli bir alan inşa ediyoruz.',
    specialties: ['Kaygı & Stres', 'İlişkiler & Aile', 'Öz Değer & Motivasyon'],
    education: 'Boğaziçi Üniversitesi Psikoloji (Lisans) • ODTÜ Klinik Psikoloji (Yüksek Lisans)',
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 114,
    available: true,
    city: 'İstanbul (Online)',
    approach: 'Bilişsel Davranışçı Terapi (BDT), Şema Terapi'
  },
  {
    id: 'c2',
    name: 'PDR Uzm. Caner Demir',
    title: 'Psikolojik Danışman & Kariyer Koçu',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
    bio: 'Özellikle genç yetişkinlerde kariyer çıkmazları, mesleki tükenmişlik (burnout), sınav kaygısı ve gelecek belirsizliği konularında danışmanlık veriyorum.',
    specialties: ['Kariyer & Eğitim', 'Öz Değer & Motivasyon', 'Kaygı & Stres'],
    education: 'Hacettepe Üniversitesi PDR (Lisans) • Ankara Üniversitesi Gelişim Psikolojisi (Y.L.)',
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 89,
    available: true,
    city: 'Ankara (Online)',
    approach: 'Çözüm Odaklı Kısa Süreli Terapi, Varoluşçu Danışmanlık'
  },
  {
    id: 'c3',
    name: 'Dr. Zeynep Bilgin',
    title: 'Uzman Psikolojik Danışman',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    bio: 'Yeni bir şehre taşınma, sosyal fobi, aidiyet eksikliği ve yalnızlık hissiyle başa çıkmada bireysel içgörü geliştirme süreçlerini destekliyorum.',
    specialties: ['Yalnızlık & Uyum', 'Kaygı & Stres', 'İlişkiler & Aile'],
    education: 'Ege Üniversitesi Rehberlik ve Psikolojik Danışmanlık (Lisans & Doktora)',
    experienceYears: 11,
    rating: 5.0,
    reviewCount: 162,
    available: false,
    city: 'İzmir (Online)',
    approach: 'Kabul ve Kararlılık Terapisi (ACT), Mindfulness'
  },
  {
    id: 'c4',
    name: 'Uzm. Psk. Arda Şen',
    title: 'Aile & Çift Danışmanı',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    bio: 'Aile içi sınırlar, toksik iletişim döngüleri, ayrılık süreçleri ve ilişki kaygıları konusunda çiftlere ve bireylere rehberlik ediyorum.',
    specialties: ['İlişkiler & Aile', 'Öz Değer & Motivasyon'],
    education: 'İstanbul Üniversitesi Psikoloji • Bilgi Üniversitesi İlişki ve Çift Terapisi Sertifikasyonu',
    experienceYears: 7,
    rating: 4.7,
    reviewCount: 74,
    available: true,
    city: 'Bursa (Online)',
    approach: 'Duygu Odaklı Terapi, Sistemik Aile Terapisi'
  },
  {
    id: 'c5',
    name: 'Psk. Danışman Selin Varol',
    title: 'Öğrenci & Genç Yetişkin Danışmanı',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    bio: 'Üniversiteye uyum, erteleme hastalığı (procrastination), odaklanma ve öz şefkat kazanımı alanlarında çalışıyorum. Kendinize karşı nazik olmayı öğrenmek bir yolculuktur.',
    specialties: ['Kariyer & Eğitim', 'Öz Değer & Motivasyon', 'Yalnızlık & Uyum'],
    education: 'Marmara Üniversitesi Rehberlik ve Psikolojik Danışmanlık',
    experienceYears: 4,
    rating: 4.9,
    reviewCount: 52,
    available: true,
    city: 'İstanbul (Online)',
    approach: 'Bilişsel Davranışçı Terapi, Öz Şefkat Odaklı Terapi'
  }
];

export const INITIAL_PROBLEMS: ProblemPost[] = [
  {
    id: 'p1',
    authorId: 'user_1',
    authorName: 'Mavi Martı',
    authorAvatar: '🕊️',
    isAnonymous: true,
    isAnonymized: true,
    category: 'Kariyer & Eğitim',
    title: 'Sürekli yetersizlik hissi ve meslekte tükenmişlik (Burnout)',
    content: 'Yaklaşık 3 yıldır yazılım sektöründeyim. Sabah kalktığımda göğsümde garip bir ağırlıkla uyanıyorum. Sanki hiçbir şeyi tam yapamıyorum ve bir gün herkes aslında hiçbir şey bilmediğimi anlayacakmış gibi geliyor (impostor sendromu). Çevremdekiler çok başarılı olduğumu söylese de içimdeki ses aksini fısıldıyor. Artık haftasonları bile dinlenemiyorum, pazartesi yaklaştıkça kalbim çarpıyor.',
    createdAt: '2 saat önce',
    solidarityCount: 38,
    hasSolidarity: false,
    matchedCounselorId: 'c2',
    matchedCounselorName: 'PDR Uzm. Caner Demir',
    comments: [
      {
        id: 'cm1',
        authorName: 'YorgunYolcu',
        authorRole: 'client',
        authorAvatar: '🌿',
        content: 'Birebir aynı duyguları 2 senedir yaşıyorum. Kendini yalnız sanma lütfen, sektördeki neredeyse her arkadaşım bu evreden geçiyor.',
        createdAt: '1 saat önce'
      },
      {
        id: 'cm2',
        authorName: 'PDR Uzm. Caner Demir',
        authorRole: 'counselor',
        authorTitle: 'Kariyer & PDR Uzmanı',
        authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
        content: 'Merhaba. İçsel eleştirmenin sesinin bu kadar yükselmesi bedensel ve zihinsel tükenmenin ilk işaretlerindendir. Kendinize başarı kriterlerini başkalarının gözünden değil, gerçekçi küçük hedeflerle yeniden tanımlamayı denediniz mi? İsterseniz mesaj üzerinden konuşabiliriz.',
        createdAt: '45 dakika önce',
        isCounselorNote: true
      }
    ]
  },
  {
    id: 'p2',
    authorId: 'user_2',
    authorName: 'DinginDeniz',
    authorAvatar: '🌊',
    isAnonymous: true,
    isAnonymized: true,
    category: 'Yalnızlık & Uyum',
    title: 'Yeni taşındığım şehirde derin bir yabancılık ve yalnızlık hissediyorum',
    content: 'Üniversite ve iş nedeniyle ailemden ve tüm çocukluk arkadaşlarımdan 800 km uzağa taşındım. İlk 1 ay heyecanlıydı ama şimdi akşam eve geldiğimde odanın sessizliği üzerime çöküyor. İnsanlarla sohbet ediyorum ama hiçbiri derinleşmiyor, herkesin oturmuş arkadaş grupları var. Kendimi görünmez bir fanusun içindeymiş gibi hissediyorum.',
    createdAt: '4 saat önce',
    solidarityCount: 52,
    hasSolidarity: false,
    matchedCounselorId: 'c3',
    matchedCounselorName: 'Dr. Zeynep Bilgin',
    comments: [
      {
        id: 'cm3',
        authorName: 'UmutArayan',
        authorRole: 'client',
        authorAvatar: '🌻',
        content: 'Ben de İstanbul\'a ilk geldiğimde aylarca balkonda oturup memleketi düşündüğümü hatırlıyorum. Zamanla o yabancı sokaklar senin evin oluyor, sabırlı ol.',
        createdAt: '3 saat önce'
      },
      {
        id: 'cm4',
        authorName: 'Dr. Zeynep Bilgin',
        authorRole: 'counselor',
        authorTitle: 'Uzm. Psikolojik Danışman',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
        content: 'Aidiyet duygusu bir anda oluşmaz, tohum ekmek gibidir. Günlük rutinler oluşturmak (aynı kafeye gitmek, yürüyüş rotası belirlemek) şehri tanıdık kılar. Yalnızlık bir yetersizlik değil, geçiş döneminin doğal bir tepkisidir.',
        createdAt: '2 saat önce',
        isCounselorNote: true
      }
    ]
  },
  {
    id: 'p3',
    authorId: 'user_3',
    authorName: 'GeceYıldızı',
    authorAvatar: '✨',
    isAnonymous: true,
    isAnonymized: true,
    category: 'Kaygı & Stres',
    title: 'Sosyal ortamlarda herkesin beni yargıladığını düşünmekten konuşamıyorum',
    content: 'Topluluk içinde fikrimi söyleyeceğim zaman birden kalbim boğazımda atmaya başlıyor, sesim titriyor. Bir şey söylersem rezil olacağım ya da herkes arkamdan gülecekmiş gibi hissediyorum. Bu yüzden toplantılarda kameramı ve mikrofonumu kapatıp görünmez olmaya çalışıyorum.',
    createdAt: 'Dün',
    solidarityCount: 71,
    hasSolidarity: false,
    matchedCounselorId: 'c1',
    matchedCounselorName: 'Uzm. Psk. Melis Kaya',
    comments: [
      {
        id: 'cm5',
        authorName: 'Uzm. Psk. Melis Kaya',
        authorRole: 'counselor',
        authorTitle: 'Klinik Psikolog',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
        content: 'Buna "spotlight effect" (projektör etkisi) diyoruz. Zihnimiz tüm gözlerin üzerimizde olduğunu ve en ufak tökezlememizi beklediğini sanır. Oysa gerçekte herkes kendi kaygılarıyla meşguldür. BDT teknikleriyle bunu kademeli olarak aşabiliriz.',
        createdAt: 'Dün',
        isCounselorNote: true
      }
    ]
  },
  {
    id: 'p4',
    authorId: 'user_4',
    authorName: 'SakinLiman',
    authorAvatar: '⚓',
    isAnonymous: true,
    isAnonymized: true,
    category: 'İlişkiler & Aile',
    title: '"Hayır" diyemediğim için herkesin sınırımı ihlal etmesine izin veriyorum',
    content: 'Birisi benden bir şey istediğinde istemesem bile "hayır" diyemiyorum. Karşımdaki kırılır, beni sevmez veya dışlar korkusuyla kendi zamanımı ve enerjimi feda ediyorum. Sonra da içten içe öfke biriktirip kendime kızıyorum. Sınır çizmek neden bu kadar suçluluk hissettiriyor?',
    createdAt: '2 gün önce',
    solidarityCount: 64,
    hasSolidarity: false,
    matchedCounselorId: 'c4',
    matchedCounselorName: 'Uzm. Psk. Arda Şen',
    comments: [
      {
        id: 'cm6',
        authorName: 'DoğaSever',
        authorRole: 'client',
        authorAvatar: '🌲',
        content: 'Geçen yıl ben de aynı durumdaydım. İlk defa "bu hafta sonu gelemeyeceğim" dediğimde dünyanın sonu gelecek sanmıştım, kimse küsmedi. İlk adımı atmak çok zor ama özgürleştirici.',
        createdAt: '1 gün önce'
      }
    ]
  },
  {
    id: 'p5',
    authorId: 'user_5',
    authorName: 'KutupYıldızı',
    authorAvatar: '🧭',
    isAnonymous: true,
    isAnonymized: true,
    category: 'Öz Değer & Motivasyon',
    title: 'Erteleme krizleri ve sürekli kendini başkalarıyla kıyaslama döngüsü',
    content: 'Sosyal medyaya girdiğimde yaşıtlarımın harika kariyerler kurduğunu, dünyayı gezdiğini görünce derin bir yetersizlik kaplıyor içimi. Bir şeye başlamak istiyorum ama "zaten mükemmel olmayacak" diyerek saatlerce dizi izliyor veya boş boş kaydırıyorum. Günün sonunda ise müthiş bir vicdan azabı...',
    createdAt: '3 gün önce',
    solidarityCount: 88,
    hasSolidarity: false,
    matchedCounselorId: 'c5',
    matchedCounselorName: 'Psk. Danışman Selin Varol',
    comments: []
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'c1',
    senderName: 'Uzm. Psk. Melis Kaya',
    senderRole: 'counselor',
    receiverId: 'client_me',
    text: 'Merhaba, İçiniDök platformuna hoş geldiniz. Paylaştığınız dertleri veya şu an hissettiğiniz şeyleri konuşmak için buradayım. İstediğiniz an yazabilirsiniz.',
    timestamp: '11:30'
  },
  {
    id: 'm2',
    senderId: 'client_me',
    senderName: 'Danışan (Siz)',
    senderRole: 'client',
    receiverId: 'c1',
    text: 'Teşekkürler Melis Hanım. Son günlerde yoğun bir kaygı yaşıyorum, özellikle gelecek planlarım konusunda tıkandım.',
    timestamp: '11:32'
  },
  {
    id: 'm3',
    senderId: 'c1',
    senderName: 'Uzm. Psk. Melis Kaya',
    senderRole: 'counselor',
    receiverId: 'client_me',
    text: 'Gelecek belirsizliği zihnin en çok senaryo ürettiği konulardan biridir. Bu kaygının bedeninize yansıyan belirtileri (çarpıntı, uykusuzluk vb.) var mı, yoksa daha çok düşünce düzeyinde mi kalıyor?',
    timestamp: '11:35'
  }
];

export const ANONYMOUS_ALIASES = [
  { name: 'Mavi Martı', avatar: '🕊️' },
  { name: 'Dingin Deniz', avatar: '🌊' },
  { name: 'Gece Yıldızı', avatar: '✨' },
  { name: 'Sakin Liman', avatar: '⚓' },
  { name: 'Kutup Yıldızı', avatar: '🧭' },
  { name: 'Umutlu Gezgin', avatar: '🚀' },
  { name: 'Güneş Işığı', avatar: '☀️' },
  { name: 'Orman Esintisi', avatar: '🍃' },
  { name: 'Bilge Çınar', avatar: '🌳' },
  { name: 'Mor Menekşe', avatar: '🌸' }
];

export const SPECIALTY_CATEGORIES = [
  'Hepsi',
  'Kaygı & Stres',
  'Kariyer & Eğitim',
  'İlişkiler & Aile',
  'Yalnızlık & Uyum',
  'Öz Değer & Motivasyon'
] as const;
