# Birleşik paneli Vercel'e alma

## Hangi paket kullanılacak?

`zosez_eski_panel_ve_yeni_ozellikler.zip` içindeki **zosez klasörü** proje köküdür. `index.html`, `package.json` ve `vercel.json` aynı kökte olmalıdır. Önceki sade çok satıcılı paketin yerine bu tam paketi kullanın; dosyaları rastgele iki projeden karıştırmayın.

Bu paketin ana adresi eski paneldir. `/platform` ek hesap ve mağaza yönetimidir. Eski site bu çalışma sırasında değiştirilmedi veya yeniden yayımlanmadı.

## A. Eski sistemi hemen kullanmaya devam etmek

Vercel ortam değişkenine `ZOSEZ_MODE=single` ekleyin. Mevcut Trendyol ve AI ortam değişkenlerinizi koruyun. Supabase zorunlu değildir. Mevcut ayar ekranından API bilgileri girilmeye devam edilir.

Bu seçenek eski tek mağaza uygulamasının davranışını korur; başka satıcıların hesap açtığı hizmet olarak kullanmayın. Faturalar ve eski yerel kayıtlar tarayıcıda saklanır. Aynı alan adı/tarayıcıda önceki yerel kayıtlar kullanılmaya devam eder; başka bir alan adına geçince o tarayıcı kayıtları otomatik taşınmaz.

## B. Başka satıcılar da hesap açacaksa

`ZOSEZ_MODE=multi` kullanın. Supabase ayarları zaten mevcutsa ve ZOSEZ_MODE belirtilmemişse uygulama otomatik olarak satıcı moduna geçer. Eksik Supabase ayarlarıyla satıcı girişini atlayıp eski ortak API anahtarına dönmez.

Gerekli ortam değişkenleri:

| Ad | Değer |
| --- | --- |
| `ZOSEZ_MODE` | `multi` |
| `APP_ORIGIN` | Sitenin kesin HTTPS adresi, ör. `https://zosez.vercel.app` |
| `SUPABASE_URL` | Supabase proje URL'si |
| `SUPABASE_ANON_KEY` | Supabase anon/public API anahtarı; service_role kullanılmaz |
| `ENCRYPTION_KEY` | 32 baytlık Base64 şifreleme anahtarı |

Yeni Supabase projesinde SQL Editor üzerinden önce `database/001_schema.sql`, sonra `database/002_stock_changes.sql` çalıştırın. **Önceki çok satıcılı paketin veritabanını kurduysanız bu dosyaları tekrar çalıştırmayın.** Aynı Supabase projesini ve aynı ENCRYPTION_KEY değerini kullanın; kayıtlı satıcı hesapları, mağazalar ve faturalar kullanılmaya devam eder. Birleştirme yeni tablo gerektirmez.

Yeni kurulumda anahtar üretmek için:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Supabase'de e-posta/parola kaydını ve doğrulama e-postasını yapılandırın; Site URL'yi gerçek sitenize ayarlayın. Gerçek satıcıların doğrulama e-postaları için SMTP ayarınızı kontrol edin. `seller-invoices` dosya kovası private kalmalıdır.

Giriş yapan satıcı eski E-LIFE SHOP paneline gelir. Üstteki **Mağaza / Hesap Yönetimi** bağlantısından veya eski Ayarlar ekranından kendi Trendyol 1/2 bağlantısını kaydeder. Ortak `TRENDYOL_API_KEY/SECRET` değerleri satıcı modunda kullanılmaz. Eski tarayıcıdaki API bilgileri veya analiz verileri yeni satıcı hesabına otomatik aktarılmaz; hesapların karışmaması için yeniden bağlantı kurulur.

## Fatura kullanımı

1. Siparişleri normal şekilde eski panelden çekin.
2. **Satış ve Raporlar → Faturalar** bölümünü açın.
3. Sipariş/mağaza seçin; PDF ekleyin veya taslak oluşturun.
4. Satıcı modunda taslak firma bilgileri `/platform#settings` ekranından girilir. Tek mağaza modunda fatura ekranındaki firma unvanı kullanılır; eksik vergi/adres alanları uydurulmaz.
5. Taslağı açın; **Yazdır / PDF olarak kaydet** düğmesiyle tarayıcı yazdırma penceresinde PDF hedefini seçin.

Tek mağaza modunda PDF dosyaları yalnız bu tarayıcıdadır. Satıcı modunda Supabase'de özel dosya olarak saklanır. Bu işlem otomatik resmî fatura kesmez veya Trendyol'a fatura göndermez.

## Vercel ve test

Framework: Other. Node: 22.x. Paketin `vercel.json` dosyasını koruyun: ana paneli hesap kontrolünden geçiren `/api/panel.js` rotası gereklidir. Ortam değişkenlerini değiştirdikten sonra yeniden deploy edin. Preview adresi farklıysa APP_ORIGIN değerini ilgili ortama göre ayarlayın.

`npm test` ile 117 yerel test çalışır. Oturum, satıcıya özel API bağlantıları, CSRF, önbellek ayrımı, eski rapor çerezinin hesaba ayrılması ve eski 104 regresyon testi kapsanır. Canlı Supabase/Trendyol ve Vercel testi yapılmadığı için dağıtımdan sonra kendi hesabınızla giriş, eski ekranlar ve küçük bir gerçek siparişin fatura işlemini kontrol edin.
