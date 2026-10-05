# Zosez kurulum rehberi

Paket hazırlanmış ve yerel testlerden geçirilmiştir. Henüz `zosez.vercel.app` üzerinde yayımlanmamıştır. Önce mevcut sitenizden ayrı bir Vercel projesinde kurun; eski sitenin kaynaklarını saklayın.

## 1. Supabase projesi oluşturun

1. Supabase hesabınızda yeni proje oluşturun.
2. Projenin **SQL Editor** bölümünde `database/001_schema.sql` dosyasının tamamını çalıştırın.
3. Ardından `database/002_stock_changes.sql` dosyasını çalıştırın. Dosyalar ilk kurulum içindir; aynı veritabanında tekrar çalıştırmayın.
4. **Authentication** bölümünde e-posta/parola ile kaydı ve e-posta doğrulamasını açın. Site URL alanına uygulamanın kesin HTTPS adresini yazın. Gerçek satıcıların doğrulama e-postaları için kendi SMTP bağlantınızı yapılandırın. Supabase'in varsayılan e-posta hizmetinin deneme kısıtları olabilir; kontrol edin.
5. **Storage** bölümünde SQL ile oluşturulan `seller-invoices` kovasının **private** olduğunu doğrulayın. Public yapmayın.
6. Proje adresinizi ve **anon/public API key** değerini alın. `service_role` anahtarı bu uygulama için gerekli değildir ve kullanılmamalıdır.

## 2. Şifreleme anahtarını üretin

Bilgisayarınızda Node.js ile aşağıdaki komutu bir kez çalıştırın:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Çıkan değeri `ENCRYPTION_KEY` olarak Vercel'e girin. Sohbete veya kaynak koduna koymayın. Dağıtımlar arasında aynı değeri koruyun.

## 3. Vercel projesini hazırlayın

ZIP'teki `zosez` klasörü proje köküdür. `package.json` ve `vercel.json` bu kökte bulunmalıdır. Kaynakları kendi Git deponuza alıp Vercel'e bağlayabilirsiniz. Framework seçimi **Other**, Node.js sürümü **22.x** olmalıdır. Paket derleme gerektirmeyen HTML/JS ve Node API kullanır; `vercel.json` yönlendirmeleri sağlar. Farklı bir framework'ün build/output ayarlarını bu projeye taşımayın.

Vercel → Project Settings → Environment Variables:

| Ad | Değer |
| --- | --- |
| `APP_ORIGIN` | Yeni projenin kesin adresi, ör. `https://zosez-platform.vercel.app` (sonunda `/` yok) |
| `SUPABASE_URL` | `https://...supabase.co` proje adresi |
| `SUPABASE_ANON_KEY` | Supabase anon/public API anahtarı |
| `ENCRYPTION_KEY` | Önceki adımda üretilen 32 baytlık Base64 değer |

Alanlar girildikten sonra yeniden deploy edin. Preview ve Production adresleri farklıysa her ortamın `APP_ORIGIN` değerini kendi adresine göre ayarlayın. Yanlış adres, kayıt/giriş dahil yazma işlemlerinin reddedilmesine neden olur.

## 4. İlk satıcı hesabı

1. Siteyi açın, **Yeni satıcı hesabı oluştur** düğmesini kullanın.
2. E-postadaki bağlantıyla adresinizi doğrulayın. Siteye dönüp e-posta/parolanızla giriş yapın.
3. **Firma Ayarları** bölümünü doldurun.
4. **Mağazalarım** bölümünden Trendyol satıcı numarası, API Key ve Secret girin. Bunlar her satıcı tarafından kendi hesabında girilir; ortak ortam değişkeni değildir.
5. Kaydetme sırasında gerçek ürün okuma isteği yapılır. Hatalı bağlantı kaydedilmez; HTTP hata kodu gösterilir.
6. **Aktarım Merkezi** üzerinden önce ürünleri, ardından seçilen tarihlerde siparişleri alın. İkinci mağaza için tekrarlayın.

Trendyol üçüncü taraf uygulama/entegratör yetkileri veya IP kısıtları hesabınıza göre ayrıca gerekebilir. Bunlar gerçek mağaza üzerinden doğrulanmadan tüm satıcılar için canlı bağlantı garantisi verilemez.

## 5. Faturalar

- Siparişler → Detay / Fatura → PDF seç → PDF'yi siparişe ekle.
- Faturalar → PDF indir. Dosyalar Supabase'de saklanır ve indirme isteği satıcı oturumunu doğrular.
- Siparişler → Detay / Fatura → Siparişten taslak oluştur.
- Faturalar → Taslağı aç / PDF → Yazdır / PDF olarak kaydet. Yazdırma penceresinde hedefi **PDF olarak kaydet** seçin. Tarayıcı üstbilgi/altbilgilerini kapatın.
- Taslak verisi veritabanında saklanır; otomatik e-Fatura/e-Arşiv kesilmez. Vergi oranı eksikse uydurulmaz. Teslimat adresi fatura adresinin yerine geçirilmez.

## 6. Stok ve fiyat

Ürünler ve Stok → Stok / Fiyat → Değişikliği hazırla → Stok/Fiyat İşlemleri → İncele ve onayla. Onay gerçek mağazaya yazma isteği gönderir. **Sonucu kontrol et** ile barkodun sonucunu doğrulayın; ardından ürünleri yeniden aktarın.

Gönderim sonucu belirsiz kaldığında otomatik tekrar yoktur. En az iki dakika bekleyin, Trendyol panelindeki değerleri kontrol edin ve **Panelde kontrol ettim** üzerinden açıklama kaydedin. Bu, başarı sonucu uydurmaz; önceki belirsiz kaydı kapatıp yeni değişikliğe izin verir. Sadece mevcut değerleri kontrol ettikten sonra kullanın.

## 7. Kontrol ve bakım

İki ayrı satıcı hesabı açıp ayrı tarayıcı oturumlarında mağaza, sipariş ve fatura listelerinin ayrıldığını doğrulayın. Canlı kullanım öncesinde küçük bir gerçek sipariş aktarımı, özel PDF yükleme/indirme ve onaylı küçük bir stok değişikliğinin Trendyol sonucu kontrolünü tamamlayın. Yerel test raporu canlı entegrasyon testinin yerine geçmez.

Bu sürüm otomatik zamanlayıcı, ortak depo/rezervasyon sistemi veya ücretli abonelik altyapısı içermez. Geniş satıcı kitlesine açmadan önce ihtiyaç duyduğunuz bu işlevler ayrıca tamamlanmalıdır.
