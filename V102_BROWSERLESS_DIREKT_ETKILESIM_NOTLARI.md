# V102 Browserless Direkt Etkileşim

- Chrome eklentisi tamamen kaldırıldı.
- Ürün popup açılınca yalnızca seçilen ürün `/api/trendyol/engagement` üzerinden taranır.
- Backend Browserless gerçek tarayıcı servisini kullanır.
- Varsayılan bölge: Amsterdam (`https://production-ams.browserless.io`).
- İlk deneme: `/unblock` + residential proxy + TR.
- Yedek: `/unblock` proxy olmadan.
- Son yedek: `/content` + stealth.
- Vercel Environment Variable: `BROWSERLESS_TOKEN` zorunlu.
- Opsiyonel: `BROWSERLESS_API_URL`.
- Toplu buton en fazla ilk 25 hedef ürünü işler; popup tek ürün işler.
- Trendyol sayfasında yayınlanmayan metrikler uydurulmaz.
