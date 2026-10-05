GÜNCELLEME: 2 Ekim panel başlıkları için PANEL_BASLIKLARI_GUNCELLEME.md belgesindeki adımları izleyin.

# Ayarlar üzerinden Favori ve Görüntülenme bağlantısı

Bu sürümde rapor için Vercel ortam değişkeni veya ayrı “Rapor erişim anahtarı” gerekmez. Eski ürün listesindeki anahtar alanı kaldırıldı. Bağlantı mevcut Ayarlar ekranından yönetilir.

## Vercel'e yükledikten sonra

1. ZIP'i açıp içindeki zosez klasörünün içeriğini mevcut projenize aktarın ve yeniden dağıtın. Sadece index.html değil, api ve lib dosyaları da güncellenmelidir. index.html ile package.json proje kökünde kalmalıdır.
2. Sayfayı yenileyin. Ayarlar bölümünde mevcut Trendyol 1 API bilgilerinizi koruyun; daha önce kaydetmediyseniz burada kaydedin.
3. Aynı sayfadaki **Trendyol Favori ve Görüntülenme → Mevcut Trendyol 1 API ile Dene** düğmesine basın. Kayıtlı API key/secret, sunucu üzerinden yalnız sabit Trendyol rapor adresine yapılan salt okunur testte kullanılır. Bilgiler yeniden girilmez veya rapor çerezine kopyalanmaz.
4. Gerçek rapor isteği başarılıysa bağlantı bu tarayıcı için kaydedilir. Ürünler ekranına dönüp tarihleri seçin ve **Favori & Görüntülenme Çek** düğmesine basın.
5. Rapor servisi Seller API bilgilerini kabul etmezse **Panel oturumuyla bağlan** bölümünü açın. Başarılı panel rapor isteğinin gerekli Authorization ve/veya Cookie değerleri buradan girilebilir. Bu değerler standart Seller API anahtarıyla aynı şey değildir. Sonra **Rapor Bağlantısını Test Et ve Kaydet** düğmesine basın.

Tarayıcı, farklı bir alan adındaki Trendyol oturumunu kendiliğinden okuyamaz. Uygulama kullanıcı adı/şifre veya OTP istemez; otomatik giriş yapmaz. Canlı isteğin hangi panel başlıklarını zorunlu tuttuğu hâlâ doğrulama gerektirir. HTTP 500 tek başına “API anahtarı yanlış” veya “kesinlikle Cookie gerekir” anlamına gelmez. Gerçek hata gösterilir, başarısız deneme bağlantı sayılmaz.

Ek başlıklar gerekiyorsa JSON alanı yalnız `x-seller-id`, `seller-id`, `x-storefront-id`, `storefront-id`, `x-csrf-token`, `x-xsrf-token`, `x-supplierid`, `x-ownerid`, `x-client-type`, `x-current-url`, `x-sc-country`, `x-sc-language`, `x-sc-store-front-id`, `x-banner-version`, `x-child-version`, `x-header-version` adlarını kabul eder. Gerekmiyorsa boş bırakın. Satıcı başlığı girilirse mevcut mağazayla eşleşmelidir. Gizli değerleri sohbete göndermeyin.

## Saklama ve bağlantı kapsamı

- Panel bilgileri yalnız başarılı rapor testi sonrasında, bu uygulamanın HttpOnly çerezlerinde en fazla bir saat tutulur. Vercel'de Secure ve SameSite=Strict kullanılır; çerez yolu `/api/trendyol` ile sınırlıdır.
- Çerez kodlaması şifreleme değildir. Aktarım HTTPS ile, sayfa JavaScript'ine erişim HttpOnly ile korunur. Rapor bilgileri localStorage/IndexedDB'ye veya kaynak koda yazılmaz, durum sorgusunda geri verilmez, loglanmaz. Mevcut Seller API saklama davranışı değiştirilmedi.
- Panel alanları gönderim sonrasında temizlenir. Başarısız test yeni bilgileri kaydetmez; varsa önceki oturum korunur. “Rapor Bağlantısını Kaldır” yalnız rapor çerezlerini siler, ürün/sipariş API ayarlarına dokunmaz.
- API modu da bir saatlik bağlantı kaydı kullanır; kayıt süresi dolduğunda aynı düğmeyle tekrar test edilir. Panel oturumu daha erken sona erebilir.
- Rapor bağlantısı, ürün listesinin kullandığı Trendyol 1 mağazasına bağlanır. Mağaza değişirse yeniden bağlanmalıdır. Trendyol 2'nin mevcut sipariş işlevleri korunur.
- Büyük Cookie başlıkları sınırlanır: yalnız gerekli rapor oturumu bilgilerini kullanın; tüm tarayıcı çerezlerini yapıştırmayın.
- Ayar yazımı aynı origin ve özel istek başlığı kontrolüyle korunur. İstek hedefi kullanıcı tarafından değiştirilemez; yönlendirmeler izlenmez. Vercel ortamındaki eski TRENDYOL_REPORT_ACCESS_KEY / TRENDYOL_PANEL_* değerleri bu sürümde kullanılmaz.

## Veriler

| Tablo alanı | Kaynak |
| --- | --- |
| Aktif Favori | productBased.currentFavorite |
| Brüt Favori | productBased.grossFavoriteCount |
| Görüntülenme | productBased.totalView |
| Sepete Ekleme | productBased.totalAddToBaskedCount |

Ürün toplamları sellerBased değerleriyle karıştırılmaz. Aktif Favori mevcut toplamdır; diğer üç metrik seçili döneme aittir. İçerik toplamları varyantlarda ortak olabilir; satırları toplayarak mağaza toplamı üretmeyin. Yorum ve puan bu raporda bulunmaz; mevcut Seller API değerleri korunur. Browserless ile ek tarama yapılmaz.

Barkod önceliklidir: contentInfo.barcode, barcodes ve barcodeSizes[].barcode desteklenir. Barkod bulunamazsa benzersiz contentId kullanılır; belirsiz eşleşme “—” olur. Başındaki sıfırlar korunur.

Tarih aralığı Türkiye saatiyle gün başlangıcı/gün sonudur ve milisaniye gönderilir. page=0, pageSize=20 ile başlanır; metadata varsa ona göre, yoksa kısa/boş sayfaya kadar tüm sayfalar alınır. 1000 sayfalık güvenlik sınırında kısmi başarı verilmez. Beklenen liste zarfları dizi, content/items/interactions/products veya bunların data altındaki biçimleridir. Kullanıcının panel görüntüsünde content, page, size, totalElements ve totalPages zarfı doğrulanmıştır; bilinmeyen biçim hata verir.

Tüm sayfalar tamamlanmadan ürünler güncellenmez. Ara sayfa hatası, yinelenen sayfa, bozuk yanıt, tarih değişimi ve eksik eşleşmede eski değerler temizlenir. Gerçek 0 korunur; bilinmeyen değer “—” gösterilir. Rapor yanıtları no-store olur. Popup aynı raporun beş dakikalık bellek önbelleğini kullanabilir; yenileme tekrar sorgular.

## Doğrulama sınırı

Canlı Satıcı Paneli / Seller API kimlik bilgileri bu çalışma ortamında bulunmadı. Dolayısıyla bu sürümün gerçek hesabınızda rapor okuyabildiği iddia edilmiyor. Önceki oturumsuz gerçek istek HTTP 500 döndürdü; kimlik doğrulama türünü kanıtlamadı. Yeni Ayarlar düğmeleri bu kontrolü sizin dağıtımınızda yapar ve yalnız başarılı rapor yanıtını kaydeder.

Yerel çalıştırma: `npm start` (http://127.0.0.1:3101). Test: `npm test`. Bağımlılık kurulumu gerekmiyor. Her rapor sayfası ayrı sunucu isteğidir; Vercel işlev süresinin en az 60 saniye olması önerilir.

Eski V102 belgeleri tarihsel notlardır; güncel kurulum için bu belgeyi kullanın.
