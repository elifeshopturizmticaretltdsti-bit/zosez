# Test raporu — 3 Ekim 2026

## Yerel otomatik testler

`npm test`: **20 test geçti, 0 hata, 0 atlanan test**. Komut Node.js 24.18.0 üzerinde çalıştırıldı. Vercel hedef sürümü 22.x; gerçek Vercel build/yayın testi yapılmadı. Ham çıktı `TEST_CIKTISI.txt` içindedir.

- Şifreleme: farklı satıcı/mağaza/anahtarla çözme ve bozulmuş şifreli metin reddedildi.
- Oturum: HttpOnly/Secure/SameSite çerezleri, oturumsuz istek, çıkış için çerez temizliği.
- CSRF: farklı origin, eksik özel başlık ve yanlış içerik türü reddedildi.
- PostgreSQL: PGlite 0.5.8 üzerinde gerçek RLS, satıcıya ait satır filtreleri, başka satıcının mağazasına/siparişine yabancı anahtar bağlama engeli, dosya politikaları ve atomik aktarım kilidi test edildi.
- Sayfalama: çok sayfalı ürün aktarımı, tarih pencereleri, hata sonrası aynı sayfadan devam etme, bitmiş işin tekrar çalıştırılmaması.
- Fatura: başka satıcının siparişine belge ekleme/indirme engeli, özel PDF roundtrip, boyut/imza denetimi, taslakta fatura adresi zorunluluğu, Türkçe metin ve HTML kaçışları.
- Stok/fiyat: doğrulama, onaysız gönderim engeli, tekrar gönderim engeli, belirsiz gönderimde otomatik tekrar yapılmaması, genel batch durumu yerine barkodun sonucunu kontrol etme.
- Tüm uygulama JS dosyalarının sözdizimi ve Vercel yönlendirme yapılandırması kontrol edildi.

## Tarayıcı kontrolü

Gerçek uygulama ekranları ayrı bir yerel test sunucusunda incelendi: giriş, ortak sipariş listesi, siparişten taslak oluşturma, Türkçe taslak önizlemesi, stok değişikliği hazırlama, eski/yeni değerlerle onay ekranı ve sonuç kontrolü. Test sunucusu açıkça **YEREL TEST ORTAMI** olarak işaretlendi. Test verileri gerçek mağaza verisi değildir ve üretim başlangıcında yüklenmez.

Fatura taslağının tarayıcı önizlemesi kontrol edildi. İşletim sistemi yazdırma penceresinden son PDF dosyasını kaydetme bu ortamda doğrulanmadı.

Tarayıcıda çıkış yapılıp ikinci test satıcısıyla giriş yapıldı; ilk satıcının faturasının ikinci hesapta görünmediği kontrol edildi.

## Yapılmayan canlı testler

Kullanıcıya ait Supabase projesi ve yeni Vercel dağıtımı henüz yok. Gerçek kayıt/doğrulama e-postası, bulut veritabanı, bulut dosya deposu, gerçek Trendyol mağazasıyla okuma/yazma ve Vercel dağıtımı doğrulanmadı. Trendyol ve Supabase HTTP yanıtları uçtan uca yerel testlerde kontrollü test cevaplarıyla temsil edildi. PostgreSQL politika testleri gerçek SQL motorunda çalıştı; bunlar Supabase bulutunun tamamının testi değildir.

Eski tek mağaza projesi değiştirilmedi; önceki 104 testi bu geliştirmeden önce geçmişti. Yeni sürüm ayrı pakettir.
