# ELIFESHOP V101 · Ürün ve Müşteri Popup Geliştirmesi

## Ürünler
- Ürüne tıklanınca açılan 360° detay penceresi genişletildi.
- Satış fiyatı, stok, 30 günlük satış, ciro, iade adedi, iade oranı, yorum, görüntülenme, gösterim, favori, sepette, puan, BuyBox, çoklu satıcı, barkod, stok kodu, son kargo ili, durum, görsel sayısı ve açıklama bilgileri gösterilir.
- Küçük sütun grafik eklendi: 30 gün satış, 30 gün iade, iade oranı.
- "Tüm Ürün Verileri" açılır bölümü eklendi.
- Trendyol API'nin ham ürün verisi de güvenli, açılır JSON görünümünde gösterilir.

## Müşteriler
- "Müşteri Ara" alanı ve butonu eklendi.
- Enter ile arama ve Temizle butonu desteklenir.
- Müşteriler satın alınan toplam ürün adedine göre büyükten küçüğe sıralanır.
- Müşteri tablosunda iade edilen ürün adedi gösterilir.
- Müşteriye tıklanınca sade popup açılır.
- Popup: satın alınan ürün adedi, iade adedi, iade oranı, toplam harcama, teslimat adresi, son sipariş/iade geçmişi.
- Trendyol 2 normalize siparişlerinde ham sipariş verisi korunarak adres alanlarının popup'a aktarılması desteklendi.

## Kontroller
- 37/37 otomatik test başarılı.
- Yerel HTTP sunucu: 200 OK.
- AI status API: 200 OK.
