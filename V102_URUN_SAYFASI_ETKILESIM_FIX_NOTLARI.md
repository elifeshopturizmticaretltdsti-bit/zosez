# V102 Ürün Sayfası Etkileşim Fix

- Çalışmayan `public-sdc/public-mdc/public.trendyol.com` gateway yaklaşımı tamamen kaldırıldı.
- Kaynak artık Trendyol resmi onaylı ürün API'sindeki `productUrl` alanıdır.
- Vercel sunucusu gerçek `www.trendyol.com` ürün sayfasını açar ve SSR `__PRODUCT_DETAIL_APP_INITIAL_STATE__` verisini parse eder.
- Yorum, değerlendirme, puan ve favori değerleri ürün sayfasından okunur.
- `pageViewCount/socialProof` ürün sayfasında yayınlanıyorsa görüntülenme alınır; yayınlanmıyorsa `—` bırakılır.
- Toplu yenileme 20 ürünlük paketlere bölündü; bir ürünün hatası tüm listeyi durdurmaz.
- En fazla 5 ürün sayfası eşzamanlı okunur; 12 saat sunucu cache kullanılır.
- Tek ürün popup açıldığında o ürün ayrıca yenilenebilir.
- `productUrl` normalize ürün modelinde korunur.
- Vercel engagement endpoint POST batch isteklerini destekler.
