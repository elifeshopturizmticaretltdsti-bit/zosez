# Canlı site kontrolü ve hata ayrımı

https://zosez.vercel.app/ HTTP 200 döndürdü. Yayındaki index.html, son panel başlıkları sürümündeki dosyayla SHA-256 karşılaştırmasında birebir aynı bulundu.

/api/trendyol/report-settings HTTP 200 döndürdü. Kontrol isteği kullanıcı tarayıcısının oturum çerezlerini taşımıyordu; bu nedenle configured:false yanıtı kullanıcının kendi oturumunun durumu hakkında sonuç vermez. Canlı rapor testi kullanıcı oturumu olmadan tekrarlanamadı.

Önceki kod tüm fetch istisnalarını aynı bağlantı/zaman aşımı mesajına dönüştürüyordu. Yeni sürüm şu güvenli hata kodlarını ayırır:

- REPORT_HEADERS_INVALID: Gönderilecek başlıklarda geçersiz karakter; istek yapılmadan reddedildi.
- REPORT_TIMEOUT: İstek veya ağ zaman aşımı.
- REPORT_DNS: Trendyol alan adı çözümlenemedi.
- REPORT_TLS: Sertifika doğrulanamadı.
- REPORT_CONNECTION: Bağlantı kesildi/reddedildi.
- REPORT_NETWORK: Yukarıdaki gruplara ayrıştırılamayan ağ hatası.
- REPORT_RESPONSE_INVALID: JSON olmayan yanıt.

Hata açıklamaları token, Cookie, anahtar veya ham hata içeriği içermez. TLS doğrulaması ve zaman aşımı koruması kapatılmadı. Süre artışıyla sorun gizlenmedi. HTTP 500 yanıtının nedeni bu değişiklikle otomatik çözüldü iddiası yoktur.

104 test geçti. Canlı bağlantı henüz doğrulanmadı. ZIP'i tüm dosyalarıyla Vercel'e yeniden dağıttıktan sonra Ayarlar → Panel oturumuyla bağlan üzerinden deneme yapılmalıdır. Geçerli Bearer ve önceki sürümde girilen ek başlıklar yalnız uygulamadaki alanlara girilir. Sonuç mesajındaki hata kodu paylaşılabilir; gizli değerler paylaşılmamalıdır.

Dağıtım kontrolü: report-settings durum yanıtında build alanı report-diagnostics-v1 olur. Bu alan gizli bilgi içermez.
