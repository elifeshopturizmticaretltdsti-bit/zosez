# V101 · Trendyol 2 Sipariş Düzeltmesi

## Düzeltilen ana sorun
Siparişler ekranındaki `Şimdi Yenile` ve 30 saniyelik otomatik yenileme yalnızca Trendyol 1 `/live-orders` akışını çağırıyordu. Trendyol 2 siparişleri ancak Ayarlar > Tüm Mağazaları Senkronize Et işlemiyle çekilebiliyordu.

## Yapılan düzeltmeler
- Ana sipariş yenileme akışına Trendyol 2 eklendi.
- Trendyol 2 delta senkronu `since` parametresiyle yalnızca yeni/değişen siparişleri çeker.
- İlk senkronlarda tarih aralığı Trendyol limitlerine uygun pencerelere bölünür.
- Trendyol 2 sipariş servisine sayfalama eklendi; 200 üzeri kayıtlar artık ilk sayfada kalmaz.
- TY2 siparişlerinde `shipmentPackageId`, `timestamp` ve `lastModifiedDate` korunur.
- Aynı sipariş numarasına bağlı bölünmüş kargo paketlerinin birbirini ezmesi engellendi.
- Ayarlar > Trendyol 2 > Kaydet işleminden sonra bağlantı testi ve sipariş senkronu otomatik yapılır.
- Manuel `Tüm Mağazaları Şimdi Senkronize Et` artık paket-korumalı ortak birleştirme motorunu kullanır.
- Sipariş ekranında TY2 API hatası varsa sessizce yutulmaz; uyarı olarak gösterilir.
- Manuel senkron sonuç mesajında Trendyol 1 ve Trendyol 2 adetleri ayrı gösterilir.

## Test
`npm test`: 23/23 başarılı.
Ek TY2 testleri:
- TY2 seçildiğinde yalnızca TY2 Seller ID sipariş endpoint'i çağrılır.
- TY2 siparişinin mağaza kodu, paket kimliği ve zaman damgası korunur.
