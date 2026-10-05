# V101 — Arama Focus + Kampanya/Reklam Öneri Motoru

## Arama alanları
- Uygulama render sonrası aktif input/textarea/select alanını yeniden odaklar.
- İmleç/caret başlangıç-bitiş konumu korunur.
- Ürünler, müşteriler, iadeler, karar merkezi ve yeni öneri ekranlarında yazarken focus kaybı önlenir.

## Kampanyalar
- Tüm ürünler gerçek ürün metriklerinden ürün bazında değerlendirilir.
- Satış, stok, iade/iade oranı, görüntülenme, favori ve fiyat sinyalleri kullanılır.
- Stok 0 veya yüksek iade varsa kampanya bekletilir.
- Satışsız, dönüşümü düşük, fazla stoklu ve güçlü satan ürünler farklı stratejilere ayrılır.
- Her ürün için teklif, süre, gerekçe ve öncelik gösterilir.
- AI ile Derinleştir mevcut AI Yol Haritası ekranına seçilen ürünle geçer.
- Hiçbir kampanya otomatik mağazaya uygulanmaz.

## Reklamlar
- Her ürün için reklam tipi/amaç, öncelik ve kontrollü günlük test bütçesi önerilir.
- Stok yoksa veya iade oranı çok yüksekse reklam bütçesi önerilmez.
- Satışsız, düşük görünürlük, yüksek trafik-düşük dönüşüm ve güçlü satış senaryoları ayrı değerlendirilir.
- Bütçe önerileri garanti değildir; başlangıç testi içindir.
- AI ile Derinleştir seçilen ürünü mevcut OpenAI ürün yol haritasına taşır.

## Test
- 40/40 otomatik test başarılı.
