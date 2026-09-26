// Helper utilities for anonymizing sensitive problem texts and matching counselors

export function anonymizeProblemText(text: string): {
  anonymizedText: string;
  detectedEntities: string[];
} {
  let processed = text;
  const detected: string[] = [];

  // E-mail regex
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
  if (emailRegex.test(processed)) {
    detected.push('E-posta adresi');
    processed = processed.replace(emailRegex, '[gizli e-posta]');
  }

  // Phone regex (Turkish formats)
  const phoneRegex = /(0?5\d{2}[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2})/g;
  if (phoneRegex.test(processed)) {
    detected.push('Telefon numarası');
    processed = processed.replace(phoneRegex, '[gizli telefon]');
  }

  // Common Turkish names (sample list for demo sanitization)
  const names = [
    'Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Can', 'Zeynep', 'Mustafa', 'Emre', 
    'Burak', 'Elif', 'Büşra', 'Merve', 'Ece', 'Deniz', 'Cem', 'Berk', 'Selin'
  ];
  
  names.forEach(name => {
    const regex = new RegExp(`\\b${name}\\b`, 'gi');
    if (regex.test(processed)) {
      if (!detected.includes('Kişi isimleri')) detected.push('Kişi isimleri');
      processed = processed.replace(regex, '[yakınım]');
    }
  });

  // Cities / specific locations
  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Eskişehir'];
  cities.forEach(city => {
    const regex = new RegExp(`\\b${city}\\b`, 'gi');
    if (regex.test(processed)) {
      if (!detected.includes('Şehir isimleri')) detected.push('Şehir isimleri');
      processed = processed.replace(regex, '[yaşadığım şehir]');
    }
  });

  // Specific workplace terms
  const workplaces = ['patronum', 'müdürüm', 'şefim', 'şirketim', 'okulum', 'fakültem'];
  workplaces.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    if (regex.test(processed)) {
      if (!detected.includes('İş/Okul detayları')) detected.push('İş/Okul detayları');
    }
  });

  return {
    anonymizedText: processed,
    detectedEntities: detected
  };
}

// Match best category based on keywords
export function detectCategory(text: string): 'Kaygı & Stres' | 'Kariyer & Eğitim' | 'İlişkiler & Aile' | 'Yalnızlık & Uyum' | 'Öz Değer & Motivasyon' {
  const lower = text.toLowerCase();
  
  if (lower.includes('iş') || lower.includes('kariyer') || lower.includes('patron') || lower.includes('müdür') || lower.includes('çalış') || lower.includes('sınav') || lower.includes('üniversite') || lower.includes('burnout')) {
    return 'Kariyer & Eğitim';
  }
  if (lower.includes('yalnız') || lower.includes('taşın') || lower.includes('şehir') || lower.includes('yabancı') || lower.includes('arkadaşsız') || lower.includes('uyum')) {
    return 'Yalnızlık & Uyum';
  }
  if (lower.includes('sevgili') || lower.includes('evli') || lower.includes('anne') || lower.includes('baba') || lower.includes('aile') || lower.includes('ayrıl') || lower.includes('ilişki') || lower.includes('aldat')) {
    return 'İlişkiler & Aile';
  }
  if (lower.includes('kendim') || lower.includes('özgüven') || lower.includes('yetersiz') || lower.includes('ertele') || lower.includes('motivasyon') || lower.includes('değersiz')) {
    return 'Öz Değer & Motivasyon';
  }
  return 'Kaygı & Stres';
}
