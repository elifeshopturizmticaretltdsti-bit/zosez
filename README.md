# E-LIFE SHOP / Zosez — Eski panel + yeni özellikler

Bu paket eski projenin üzerine hazırlanmıştır. **Ana adres `/` eski E-LIFE SHOP panelidir.** Önceki `zosez_cok_saticili_v1.zip` paketindeki sade yeni ekran ana panel olarak kullanılmaz.

## Korunan eski ekranlar

Ana sayfa, ürünler, siparişler, kargo hazırlama, en çok/en az/hiç satmayanlar, iadeler, iptaller, Türkiye satış haritası, kâr/zarar, gelir/gider, müşteriler, ürün sağlığı, satış grafiği, AI yol haritası, onay merkezi, koruma politikaları, işlem geçmişi, sonuç merkezi, kampanyalar, reklamlar ve mevcut ayarlar korunur. Türkçe menü ve eski tasarım kullanılır.

## Eklenenler

- Eski **Satış ve Raporlar** menüsüne **Faturalar** eklendi. Üst bölümde ayrıca doğrudan Faturalar bağlantısı vardır.
- Eski paneldeki sipariş seçilerek PDF yüklenir, listelenir ve indirilir. Siparişten fatura taslağı oluşturulup yazdırma penceresinden PDF olarak kaydedilir. Taslak resmî e-Fatura/e-Arşiv değildir.
- Tek mağaza modunda fatura dosyaları bu tarayıcıdaki IndexedDB'de saklanır. Tarayıcı verilerini silmeden önce PDF'leri indirin.
- Satıcı modunda eski panel giriş gerektirir; mağaza anahtarları hesabın şifreli kaydından alınır. Faturalar hesabın özel bulut deposundadır. Eski siparişten fatura oluşturulmadan önce paket kayıtlı mağazanın gerçek API'sinden tekrar doğrulanır.
- Satıcı modunda kargo hazırlama, maliyet, analiz ve ürün/sipariş önbellekleri de hesaba göre ayrılır. Eski ortak önbellek başka bir hesaba taşınmaz. Bu yerel analiz kayıtları cihazlar arasında otomatik eşitlenmez.
- `/platform` yalnız hesap/mağaza, kalıcı aktarım ve onaylı canlı stok/fiyat yönetimi için ek yönetim ekranıdır. Buradan **Mevcut panele dön** ile eski panele dönülür. Girişten sonra eski panel açılır.

## Başlatma

```powershell
npm start
```

Adres: `http://localhost:3104`. Testler: `npm test`.

Kurulum seçenekleri ve Vercel geçişi için `BIRLESIK_KURULUM.md` dosyasını okuyun. Eski kurulum notları tarihsel referans olarak bırakılmıştır; bu sürüm için bu dosya ve BIRLESIK_KURULUM.md geçerlidir.

## Durum

Eski 104 test ve birleştirme için eklenen 13 test geçti: **117 test, 0 hata**. Eski ana panel, ürün analiz ekranı ve yeni fatura ekranı tarayıcıda açılarak kontrol edildi. Gerçek Supabase/Trendyol hesaplarıyla canlı test veya Vercel dağıtımı bu çalışma sırasında yapılmadı.

Favori/görüntülenme raporunun önceki erişim sorunu bu birleştirmeyle çözülmüş sayılmaz. Rapor kodu ve ayar ekranı korunmuştur; sahte metrik eklenmez. Otomatik ortak stok/depo rezervasyonu, ücretli abonelik, resmî e-Fatura ve çok satıcılı webhook henüz yoktur. Eski ortak webhook satıcı modunda diğer satıcılara veri sızdırmaması için kullanılmaz; hesaba özel sipariş sorgulaması devam eder. Eski analiz ekranındaki senaryolar yereldir; canlı stok/fiyat gönderimi ek yönetim ekranında ayrıca onaylanır.
