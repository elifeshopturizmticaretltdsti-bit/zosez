# Panel başlıkları güncellemesi — 2 Ekim 2026

Bu güncelleme, kullanıcı tarafından başarılı Trendyol rapor isteğinde gözlemlenen başlıkları destekler. Önceki sürüm x-supplierid, x-client-type ve x-sc-* başlıklarını göndermiyordu. Bunun HTTP 500'ün tek nedeni olduğu henüz doğrulanmadı.

Vercel projesine ZIP'in içindeki tüm dosyaları aktarın ve yeniden dağıtın. Ardından:

1. Ayarlar → Trendyol Favori ve Görüntülenme → Panel oturumuyla bağlan bölümünü açın.
2. Panel Authorization alanına geçerli Authorization değerini Bearer kısmıyla birlikte girin. Gizli değeri sohbet ortamına göndermeyin.
3. Ek rapor başlıkları bölümündeki JSON alanına, 2 Ekim tarihinde gözlemlediğiniz aşağıdaki değerleri girin:

```json
{
  "x-banner-version": "f93be8fd",
  "x-child-version": "2382b3f1",
  "x-header-version": "4c717f02"
}
```

Bu üç sürüm değeri zamanla değişebilir. Değişmişlerse başarılı güncel panel isteğindeki karşılıklarını kullanın. Kaynak koda veya kalıcı varsayılanlara sabitlenmemiştir.

4. Rapor Bağlantısını Test Et ve Kaydet düğmesine basın. Başarılı yanıt alınırsa Ürünler ekranından raporu çekin. Cookie gerekiyorsa yalnız kendi uygulamanızdaki ilgili alana girin; bu güncelleme Cookie'nin gerekli olduğunu varsaymaz.

Otomatik gönderilen başlıklar:

- x-supplierid: kayıtlı Trendyol 1 mağazasının satıcı ID'si. Kullanıcının ID'si koda gömülmez. Ayarlardaki ID başarılı panel isteğiyle aynı mağazaya ait olmalıdır.
- x-client-type: WEB_APP
- x-current-url: https://partner.trendyol.com/business-advisor/sales-enhancer/visit-fav
- x-sc-country: TR
- x-sc-language: tr-TR
- x-sc-store-front-id: 1

x-ownerid gözlemlenmediği için üretilmez. Gerektiği ayrıca doğrulanırsa ek JSON alanında verilebilir. x-supplierid ile başka mağazaya geçiş, Host/Authorization/Cookie alanlarını ek JSON üzerinden değiştirme ve satır sonu enjeksiyonu engellenir.

Bağlantı testi artık bugün dahil son 7 günü kullanır. 2 Ekim 2026 için startDate=1790370000000, endDate=1790974799999, page=0, pageSize=20, language=tr ürettiği test edildi; bu, paylaşılan başarılı isteğin parametreleriyle aynıdır.

101 otomatik test geçti. Canlı Bearer token bu çalışma ortamına alınmadığından Vercel üzerinden başarılı rapor okuması doğrulanamadı. Geçen testler canlı bağlantı garantisi değildir. Satıcı Paneli/IP/oturum kısıtları veya başka bir eksik başlık hâlâ etkili olabilir. Hata halinde sahte veri ya da 0 gösterilmez.
