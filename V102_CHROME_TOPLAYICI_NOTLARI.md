# V102 Chrome Trendyol Etkileşim Toplayıcı

- Vercel/datacenter üzerinden Trendyol ürün sayfası engellenebildiği için panel artık önce yerel Chrome eklentisini arar.
- Eklenti kuruluysa Favori & Yorumları Çek butonu ürün sayfalarını kullanıcının normal Chrome oturumundan okur.
- Önce eklenti background fetch denenir; engellenirse ürün pasif bir sekmede açılır, SSR/DOM metrikleri okunur ve sekme kapatılır.
- Favori, yorum, puan, değerlendirme sayısı ve yayınlanıyorsa 24 saat görüntülenme alınır.
- Eklenti bağlı değilse mevcut Vercel engagement endpoint'i yedek olarak kalır.
- Tek seferlik kurulum dosyaları `chrome-extension/` klasöründedir.
