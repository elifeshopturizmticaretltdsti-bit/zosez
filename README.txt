GÜNCEL RAPOR ENTEGRASYONU: RAPOR_KURULUMU.md dosyasını okuyun. Browserless rapor taraması kaldırıldı. Canlı panel oturumuyla doğrulama bekliyor.

# ELIFESHOP V101 — E-Ticaret Kontrol ve Karar Merkezi

Temel: Kullanıcının son gönderdiği `ELIFESHOP_V99_API_ALANLARI_HB1_N11_2_FIX.zip`.
V100 HTML dosyası temel alınmamıştır. V99 menüleri, sipariş, müşteri, harita,
kâr/zarar ve pazaryeri servis dosyaları korunmuş; yeni karar merkezi eklenmiştir.

## Çalıştırma

1. ZIP'i bir klasöre çıkarın.
2. Node.js 22 kurulu bilgisayarda bu klasörde `npm start` çalıştırın.
3. Tarayıcıda `http://127.0.0.1:3101/#/karar-merkezi` adresini açın.
4. Gerçek veri için mevcut Ayarlar ekranındaki pazaryeri bağlantısını kullanın.
5. Testler: `npm test`. Paket için ek npm bağımlılığı gerekmez.

Vercel için ZIP içindeki proje kökü kullanılabilir; mevcut iki dinamik API yolu korunur.
Bu çalışma sırasında dağıtım yapılmamıştır. Tek HTML'de yeni JavaScript, CSS ve üç
logo gömülüdür. HTML'yi çift tıklayarak açmak API sunucusunu başlatmaz;
API bağlantısı ve güvenilir tarayıcı kaydı için HTTP üzerinden çalıştırın.

## Eklenenler

- AI olmadan kategori medyanı ve en fazla 5 satış lideriyle teşhis.
- Eksik/sıfır ayrımı; farklı kategoriye otomatik geçiş yok.
- Satış, fiyat, stok, dönüşüm, görünürlük, sosyal kanıt, BuyBox, favori,
  görsel ve içerik göstergeleri; açıklanan alt skorlar ve veri yeterliliği.
- Ana/yan sinyaller ve ilk inceleme adımı. Bunlar nedensellik kanıtı değildir.
- Eski/yeni fiyat, değişim yüzdesi, komisyon, alış, katkı kârı/marjı simülasyonu.
- Bilgi/kontrollü/kritik/yasak seviyeleri; ayarlanabilir sınırlar.
- Eksik maliyet, zarar, limit aşımı ve eski değer çakışmasında engelleme.
- Kritik işlemde gerekçe ve ayrı ikinci onay; maliyet/politika değişirse yeniden onay.
- Yerel fiyat/stok/başlık/açıklama senaryoları; atomik paket uygulaması;
  tek satır veya paket geri alma da güncel politika ve onaydan geçer.
- Eski/yeni değer, kaynak, zaman, gerekçe ve sonuç içeren IndexedDB günlüğü;
  çoklu sekme sürüm çakışması kontrolü ve JSON dışa aktarımı.
- 3/7/14/30 gün kayıt/takvim modeli. Harici uygulama beyanı ve eşit dönemli
  satış/görüntülenme/kâr girdilerinden önce/sonra karşılaştırması.
- AI için kimlik bilgisi içermeyen teşhis/kanıt JSON paketi; AI bağlantısı zorunlu değil.
- Kullanıcının Trendyol Express, Aras ve Yurtiçi görselleri otomatik eşleştirilir.
  Marketplace eki temizlenir; `width:5mm;height:10mm;object-fit:contain`;
  diğer taşıyıcılarda nötr paket ikonu kullanılır.

## İşlev sınırları — canlı kullanım öncesi okuyun

**Bu sürümde canlı mağazada fiyat/stok/içerik yazma ve canlı geri alma yoktur.**
Son ZIP'te bu servis bulunmadığı için onaylı uygulamalar açıkça "Yerel uygulandı"
olarak kaydedilir. Orijinal API ürünleri değiştirilmez. Sunucu canlı katalog
yazma/execute/rollback uç noktalarını reddeder. Bu nedenle canlı entegrasyon,
sunucu tarafında kalıcı onay deposu ve yetkilendirme ayrıca tamamlanmalıdır.
Mevcut bağlantı ayarları ve webhook servisleri kendi eski akışlarını korur;
katalog işlem onayı bunlar için uygulanmaz.

İkinci onay ikinci bir kullanıcı hesabının doğrulanması değildir. Operatör
kimliği yoksa audit alanı null kalır. IndexedDB tarayıcıya ve adrese özeldir;
sunucu seviyesinde değiştirilemez denetim kaydı veya yedekleme değildir.
Tarayıcı verileri temizlenirse geçmiş kaybolabilir. JSON indirerek yedek alın.

Kayıt takibi uygulama kapalıyken çalışmaz; cron, bildirim veya otomatik tarihsel
metrik çekimi eklenmemiştir. Yerel senaryoya gerçek satış başarısı atfedilmez.
Harici aksiyon performansı kullanıcı tarafından eşit dönem toplamları ve kaynak
referansı ile girilir. ±%5 satış değişimiyle iyileşti/etkisiz/kötüleşti belirlenir;
bilinen kâr düşüşü sonucu kötüleştirir. Eksik veri veya eşit olmayan dönem
"Veri yetersiz" olur. Henüz tamamlanmayan dönem ölçümü kaydedilemez.

Görüntülenmenin 30 günlük dönemi API'den doğrulanmıyorsa dönüşüm hesaplanmaz.
Kategori eşleşmesi model/ölçü/marka eşdeğerliğini garanti etmez. Katkı marjı
vergi, iade ve listelenmeyen giderleri kapsamaz; net muhasebe kârı değildir.

## Doğrulama

16 otomatik test başarılı: eksik veri, kategori sınırı, 5 ürün seçimi,
dönem uyumu, yüzde/marj, politika engelleri, ikinci onay, kayıt, yeniden
uygulama, geri alma, atomik paket çakışması, HTML kaçışları, tüm JavaScript
sözdizimi ve canlı yazma engeli.

Tarayıcıda izole test ürünleriyle Ürün Sağlığı, ürün teşhisi, fiyat simülasyonu,
onay kuyruğu, ayrı ikinci onay ekranı ve yenileme sonrası kayıt kalıcılığı
kontrol edildi. Test ürünleri/işlemleri teslim edilen pakete dahil değildir.
Gerçek satıcı kimlik bilgileriyle API çağrıları ve canlı dağıtım test edilmedi.
