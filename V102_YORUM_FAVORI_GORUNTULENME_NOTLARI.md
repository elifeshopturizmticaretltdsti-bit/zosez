# ELIFESHOP V102 — Yorum / Favori / Görüntülenme Zenginleştirme

## Ne değişti?
- Trendyol satıcı API ürün verisi korunur.
- Eksik etkileşim metrikleri için Trendyol'un halka açık ürün/listeleme veri katmanı ikinci kaynak olarak kullanılır.
- Ürünler `contentId` veya barkod üzerinden eşleştirilir.
- Yorum sayısı: `ratingScore.totalCommentCount` ve uyumlu alternatif alanlardan okunur.
- Favori sayısı: `favoriteCount` / social proof alanlarından okunur.
- Puan ve değerlendirme sayısı da alınır.
- Görüntülenme: Trendyol public social proof'ta bulunursa son 24 saat görüntülenme olarak kaydedilir (`viewsPeriodDays=1`).
- Sepetteki kişi ve kısa dönem social-proof sipariş adedi bulunursa ürün verisine eklenir.
- Ürünler ekranına `❤💬👁 Etkileşimleri Yenile` butonu eklendi.
- Ana senkronizasyon sonrası etkileşim zenginleştirmesi arka planda otomatik çalışır.
- Ürün popup'ında eksik yorum/favori/puan varsa tek ürün public-detail kaynağıyla tamamlayıcı kontrol yapılır.
- Verinin kaynağı ve görüntülenme dönemi ürün popup'ında görünür.

## Veri doğruluğu
- Veri bulunamadığında `0` uydurulmaz; `—` korunur.
- Public social-proof görüntülenmesi 30 günlük değildir; bulunursa `24s` olarak etiketlenir.
- Pasif / yayında olmayan ürünlerin public metrikleri Trendyol tarafından yayınlanmıyorsa alınamaz.
- Public veri kaynağı değişirse ana satıcı API verileri çalışmaya devam eder; yalnızca etkileşim zenginleştirmesi hata mesajı gösterir.

## Performans
- Mağaza public listeleme verisi sayfalar halinde ve 5'li paralel gruplar ile çekilir.
- Sunucu tarafında 30 dakika önbellek vardır.
- Tarama 60 public sayfa ile sınırlandırılmıştır; mevcut yaklaşık 788 aktif ürün hacmi için yeterlidir.

## Test
- 52/52 otomatik test başarılı.
- Yerel sunucu: HTTP 200 OK.
