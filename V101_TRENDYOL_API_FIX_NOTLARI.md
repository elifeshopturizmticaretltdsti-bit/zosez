# V101 Trendyol API Ayar Bağlantı Düzeltmesi

## Düzeltilen hata
Ayarlar ekranındaki `Trendyol 1 (TY1)` kartı bilgileri `elife_m_ty1` güvenli çerezine kaydediyordu. Ana Trendyol ürün/sipariş motoru ise sadece eski `elife_ty_sid`, `elife_ty_key`, `elife_ty_secret` çerezlerini aradığı için şu uyarı oluşabiliyordu:

`Trendyol API bilgileri yapılandırılmamış. Ayarlar bölümünden Seller ID, API Key ve API Secret girin.`

## Yapılan düzeltmeler
- Ana Trendyol API motoru artık önce eski bağlantı bilgilerini, yoksa doğrudan `TY1` ayar kartının güvenli çerezini okur.
- Trendyol 1 kartında `Kaydet` işleminden sonra bağlantı otomatik test edilir.
- Başarılı bağlantı sonrası ürün/sipariş verileri otomatik yenilenir.
- Mevcut eski bağlantı yöntemi geriye dönük uyumluluk için korunmuştur.
- Performans/donma düzeltmeleri korunmuştur.

## Kontrol
- Tüm mevcut otomatik testler: 21/21 başarılı.
- TY1 çerezinden Seller ID / API Key / API Secret okuma testi: başarılı.
