# V101 — İadeler Ayrı Sekme

- Satış menüsündeki birleşik `İade ve İptaller` kaldırıldı.
- `İadeler` (`#/iadeler`) ve `İptaller` (`#/iptaller`) ayrı ana sekmeler olarak eklendi.
- İadeler yalnızca iade/returned statülerini gösterir.
- İptaller; iptal/cancelled ve tedarik edilemedi/unsupplied statülerini gösterir.
- Trendyol 1 ve Trendyol 2 statü adları Türkçeleştirilmiş durum üzerinden ayrıştırıldığı için TY2 `Returned` kayıtları da İadeler ekranına girer.
- İadeler/İptaller ekranlarında mağaza filtresi, arama, kayıt sayısı, ürün adedi, toplam tutar ve bugün sayacı bulunur.
- `Yenile` mevcut TY1+TY2 sipariş yenileme motorunu kullanır.
- Eski `#/iadeler-iptaller` rotası geriye dönük uyumluluk için iki yeni sekmeye yönlendiren özet ekran olarak korunmuştur.
- Otomatik sipariş yenileme açıkken İadeler ve İptaller sekmeleri de canlı güncellenir.

Test: 25/25 başarılı. Yerel sunucu: HTTP 200.
