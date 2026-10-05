# ELIFESHOP V101 — Sekme Donma / Performans Düzeltmesi

Bu paket, V101 arayüzünde ağır veri altında sekme geçişlerini ve etkileşimi yavaşlatan noktaları azaltır.

- Ürün ve sipariş araması her tuşta tam sayfa render etmek yerine kısa gecikmeli render kullanır.
- Sipariş Merkezi kapalı sipariş detaylarını başlangıçta DOM'a basmaz; detaylar grup açıldığında 40 satır/sayfa yüklenir.
- Sipariş ürün görseli eşleştirmesi her sipariş satırında 5.000+ ürün içinde `find` yapmak yerine SKU/barkod indeksinden O(1) arama yapar.
- Sipariş grupları aynı render içinde ikinci kez hesaplanmaz.
- V101 Ürün Sağlığı kategori karşılaştırmaları aynı veri kümesi için önceden hazırlanmış kategori bağlamını kullanır; tekrarlı tam sıralamalar kaldırıldı.
- Onay Merkezi, İşlem Geçmişi ve Sonuç Merkezi kayıtları sayfalandırıldı.
- Türkiye Satış Haritası SVG kaynağı oturum içinde önbelleğe alınır; sekme/şehir geçişlerinde tekrar indirme azaltıldı ve 8 saniye zaman aşımı eklendi.
- Mevcut veri güvenliği/onay mantığı ve canlı mağazaya yazma kısıtları korunmuştur.

## Kontrol

- `npm test`: 21/21 test başarılı.
- Yerel HTTP smoke test: ana sayfa 200 OK.
- 5.000 ürün / görünür 25 Ürün Sağlığı teşhisi sentetik ölçümde yaklaşık 131 ms (çalışma ortamına göre değişir).
