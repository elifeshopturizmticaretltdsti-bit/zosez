# Test sonuçları — Ayarlar sürümü, 1 Ekim 2026

Bu sürümde ayrı rapor erişim anahtarı kaldırıldı. Ayarlar ekranına kayıtlı Seller API ile deneme, panel oturumu ile test/kaydetme, bağlantı durumunu okuma ve rapor bağlantısını kaldırma eklendi.

Son test sonucu: 104 test geçti, 0 başarısız, 0 atlanan. Komut: node --test tests/*.test.cjs. Ortam: Windows / Node.js v24.18.0; Node 22 üzerinde ayrıca çalıştırılmadı.

Önceki sayfalama, barkod önceliği, çoklu varyant, eksik/sıfır değerler, tarih aralığı, ara sayfa hatası ve ürün/sipariş regresyon testleri korundu. Yeni kontroller:

- Kayıtlı API bilgilerinin yeniden girilmeden rapor testinde kullanılması; rapor çerezine API anahtarı kopyalanmaması.
- Başarılı yanıt olmadan oturum kaydedilmemesi; başarısız denemenin otomatik olarak başka auth türüne geçmemesi.
- HttpOnly, Secure, SameSite=Strict, bir saat sınırı ve yalnız rapor yolunda çerez gönderimi.
- Mağaza değişimi, oturum süresi, bozuk/büyük çerez ve başlık enjeksiyonunun reddi.
- Başka origin'den ayar yazımının engellenmesi.
- Durum yanıtında gizli bilgi bulunmaması; silmenin yalnız rapor oturumunu etkilemesi.
- Form gönderiminde panel alanlarının temizlenmesi ve ayrı erişim anahtarının kaldırılması.

Yerel tarayıcıda mevcut Ayarlar kartları ve yeni rapor bölümü açıldı. “Mevcut Trendyol 1 API ile Dene” düğmesi, bu ortamda API bilgileri olmadığı için doğru eksik bağlantı hatasını gösterdi. Panel alanları password türündedir. Ürün listesinden yeni Ayarlar bağlantısı ve hata yönlendirmesi kontrol edildi. Uygulama JavaScript hata kaydı görülmedi.

Test yanıtları yalnız test dosyalarında izole örneklerdir; üretim uygulamasına/demo tabloya yüklenmez. Canlı kimlik bilgileri bulunmadığından hesabınızda başarılı rapor çekimi doğrulanamadı. Kod ve arayüz testlerinin geçmesi canlı API uyumluluğu kanıtı değildir.

Son düzeltme: Rapor bağlantısı testinde Node IncomingMessage.headers prototip erişimcisi nesne kopyalama sırasında kayboluyordu. Hata, Trendyol isteği yapılmadan aynı genel mesajla yeniden üretildi (0 upstream çağrı). Başlıklar artık açıkça aktarılıyor. Gerçek IncomingMessage ile başarılı istek/kayıt ve upstream HTTP 500 hata aktarımı için iki regresyon testi eklendi.

2 Ekim başlık güncellemesi: gözlemlenen x-supplierid / x-client-type / x-sc-* başlıklarının üretimi, üç sürüm başlığının kaydedilip geri okunması, mağaza/başlık enjeksiyon koruması ve 7 günlük sorgunun 1790370000000–1790974799999 değerlerini üretmesi test edildi.

Canlı site kontrolü sonrasında ağ hata sınıflaması, geçersiz başlıkların ağ öncesi reddi ve yanıt gövdesi zaman aşımı için üç regresyon testi eklendi. Tüm 104 test geçti; kimlik doğrulamalı canlı rapor testi yapılamadı.
