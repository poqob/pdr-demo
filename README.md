# İçiniDök - PWA Destekli Danışan & Danışman Dayanışma Platformu (Demo)

Bu proje, danışanların dertlerini güvenle anlatabildiği, uzman danışmanlarla (PDR / Klinik Psikolog) birebir buluşabildiği ve birbirine destek olan dayanışma akışında anonim paylaşımlar yapabildiği modern bir **React + TypeScript + Tailwind CSS** Progressive Web App (PWA) demo uygulamasıdır.

Tüm veriler frontend tarafında simüle edilir ve tarayıcının `localStorage` alanında saklanır. Hiçbir harici backend gerektirmez.

---

## 🌟 Öne Çıkan Özellikler

### 1. Şifresiz Hızlı Giriş (Danışan & Danışman Rolleri)
- **Danışan Olarak Gir:** Rastgele veya seçilebilir sevimli anonim rumuzlar (örn: *Mavi Martı*, *Dingin Deniz*, *Kutup Yıldızı*).
- **Danışman Olarak Gir:** Kadroda bulunan uzman psikolojik danışman veya klinik psikolog profillerinden biriyle giriş yapabilme.
- İstediğiniz an sol menüden tek tıkla rol değiştirme imkanı.

### 2. İlk Ekran: Danışan-Danışman İletişimi (Meeting & Hub)
- Danışan ve Danışmanın platforma girdiğinde karşılaştığı ana buluşma ekranı.
- **Danışan için:**
  - Hızlı "Derdini Anlat & Eşleş" çağrısı
  - Alanında uzman danışman kadrosu (unvan, şehir, bio, yaklaşım, puan ve deneyim yılları)
  - Uzman filtreleme (Kaygı & Stres, Kariyer & Eğitim, İlişkiler & Aile, Yalnızlık & Uyum vb.)
  - Doğrudan birebir sohbet (Chat) başlatma veya detaylı profili inceleme.
- **Danışman için:**
  - Özel Danışman Paneli
  - Danışanlardan gelen aktif görüşmeler ve soru mesajları
  - **"Profilimi Düzenle"** butonu: Fotoğraf/avatar, ad, unvan, bio, uzmanlık etiketleri, eğitim geçmişi ve terapi yaklaşımı (tümü opsiyonel) anında güncellenebilir.

### 3. Akıllı Anonimleştirme & Dert Paylaşımı
- Danışan derdini yazdığında:
  - **Akıllı Metin Analizi:** Konuyu otomatik tespit eder (örn. Kariyer, Yalnızlık, Kaygı) ve en uygun uzman danışmanı eşleştirir.
  - **🛡️ Akıllı Anonimleştirme:** Metindeki kişi adlarını (`Ahmet -> [yakınım]`), şehirleri (`İstanbul -> [yaşadığım şehir]`), e-posta ve telefonları tek tıkla sansürler.
  - **İki Alternatif Yol:** Dilerse sadece danışmanla özel mesajlaşma başlatır, dilerse topluluk akışında yayınlar.

### 4. İkinci Ekran: Topluluk & Dayanışma Akışı (Feed)
- Benzer duyguları yaşayan insanların bir araya geldiği, empati ve dayanışma hissini güçlendiren akış.
- **"Yalnız Değilsin" (Dayanışma Butonu):** Tek tıkla kalpleri ve destek sayısını artıran etkileşim.
- **Destek Notları (Yorumlar):** Danışanlar empati mesajları bırakabilir, Uzman Danışmanlar ise özel *"Uzman Danışman Notu"* rozetiyle profesyonel içgörüler sunabilir.
- Her derdin yanında önerilen ilgili uzman danışman rozeti bulunur.

### 5. Mobil Swipe (Kaydırma) & Masaüstü Panel Navigasyonu
- **Mobilde / PWA:**
  - Ekranı **sağdan sola kaydırınca (swipe left)** -> *Topluluk Akışı*'na geçer.
  - Ekranı **soldan sağa kaydırınca (swipe right)** -> *Danışmanlık & İletişim* ekranına döner.
  - Ayrıca üstte kaydırma sekme göstergeleri ve altta *Bottom Navigation Bar* mevcuttur.
- **Masaüstünde (Desktop):**
  - Ekranın solunda yer alan sabit **Sidebar Paneli** üzerindeki şık butonlarla sayfalar arasında anında geçiş sağlanır.

### 6. PWA (Progressive Web App) Desteği
- `manifest.webmanifest`, service worker (`vite-plugin-pwa`) ve offline önbellek desteği.
- Mobil cihazlarda ana ekrana eklenebilir, tam ekran uygulama olarak çalışabilir.

---

## 🚀 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin (zaten kurulu)
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi (Production build)
npm run build
```
# pdr-demo
