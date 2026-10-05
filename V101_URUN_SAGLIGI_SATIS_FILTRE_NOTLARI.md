# V101 Ürün Sağlığı · Satış Filtreleri ve Grafikler

Bu sürümde Ürün Sağlığı tablosu satış davranışına göre filtrelenebilir hale getirildi.

## Eklenenler
- Tümü
- En Çok Satanlar: satış yapan ürünlerin üst %20'si
- Normal Satanlar: satış yapan fakat üst %20'de olmayan ürünler
- Hiç Satmayanlar: son 30 gün satışı 0 olan ürünler
- Her ürün için ayrı `30 Gün Satış` adedi
- Her ürün için son 30 günlük günlük satış mini grafiği
- Grafikte son 7 gün toplamı
- Ürün görseli + kategori + stok kodu aynı tabloda korunur
- Filtreye basıldığında veri 60 saniyeden eskiyse canlı API senkronizasyonu tetiklenir
- Günlük sipariş dağılımı yalnızca gerçek sipariş satırlarından oluşturulur; eşleşmeyen dağılım tahmin edilmez
- Aynı siparişe ait bölünmüş kargo paketlerinin senkronizasyonda ezilmemesi için paket kimliğini koruyan birleştirme motoru kullanılır

## Performans
- Günlük satış serileri ürün/sipariş dizisi değişene kadar önbelleğe alınır.
- Tabloda yalnızca mevcut sayfadaki 25 ürün için teşhis ve grafik HTML'i üretilir.
- 21/21 mevcut otomatik test başarılıdır.
