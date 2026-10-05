# V102 Etkileşim Fetch Fix

## Düzeltme
- `public.trendyol.com` tek bağımlılık olmaktan çıkarıldı.
- Sıralı gateway failover eklendi: `public-sdc.trendyol.com`, `public-mdc.trendyol.com`, `public.trendyol.com`.
- Node `fetch` ağ seviyesinde başarısız olursa IPv4 zorlayan yerleşik HTTPS yedeği devreye girer.
- Browser benzeri `Referer`, `Origin`, `Accept-Language` ve `User-Agent` başlıkları kullanılır.
- HTTP olmayan `fetch failed` durumlarında `ENOTFOUND`, `ECONNRESET`, TLS/DNS hostname gibi kök hata ayrıntıları artık korunur ve API cevabına yazılır.
- Başarılı sonuçta kullanılan gateway ve transport bilgisi servis cevabında bulunur.

## Veri doğruluğu
Bu metrikler Trendyol'un resmi satıcı entegrasyon API'sinin belgelenmiş alanları değildir; halka açık Trendyol storefront verisi üzerinden zenginleştirilir. Kaynak herhangi bir metrik yayınlamazsa panel sayı uydurmaz ve `—` gösterir.
