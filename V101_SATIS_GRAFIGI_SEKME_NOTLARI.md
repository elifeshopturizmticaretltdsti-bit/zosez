# ELIFESHOP V101 - Satış Grafiği Ayrı Sekme

- Ürün Sağlığı tablosundaki küçük satış grafikleri kaldırıldı.
- V101 üst sekmelerine ve ana menüye `Satış Grafiği` eklendi.
- Ürün Sağlığı tablosunda ürün adına veya `Satış Grafiği` butonuna tıklanınca seçilen ürün grafik sekmesinde açılır.
- Neden Satmıyor detayından da aynı ürüne ait satış grafiğine geçilebilir.
- Satış Grafiği sekmesinde ürün arama/seçme alanı bulunur.
- Grafik son 30 günü günlük bazda gösterir; API 30 günlük toplamı, sipariş satırlarından eşleşen toplam, son 7 gün ve en iyi gün ayrıca gösterilir.
- İptal/iade siparişleri grafikten çıkarılır.
- Grafik yalnızca seçili ürün için hesaplandığı için 5.000+ ürün listesinin tamamı için grafik hesaplaması yapılmaz.
- API toplamı ile günlük sipariş satırı eşleşmesi farklıysa kullanıcıya uyarı gösterilir; eksik veri tahmin edilmez.
- 21/21 otomatik test başarılı.
