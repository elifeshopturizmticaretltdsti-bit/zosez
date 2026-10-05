# ELIFESHOP V101 — AI Ürün Yol Haritası

## Yeni özellikler
- ÜRÜN ANALİZ menüsüne **AI Yol Haritası** sekmesi eklendi.
- Ürün Sağlığı tablosunda her ürün için **AI Analiz** butonu eklendi.
- Satış / İade Grafiği ve Neden Satmıyor ekranlarından seçili ürünü AI analizine gönderme eklendi.
- Her analiz yalnızca çağrılan ürün için çalışır; tüm katalog otomatik analiz edilmez.
- Analizde kullanılan kanıtlar: 30 gün satış, 30 gün iade, iade oranı, son 7 gün, stok, fiyat, görüntülenme/favori/yorum/puan (varsa), BuyBox (varsa), görsel/açıklama sinyalleri, kategori karşılaştırması, ilk 5 benzer ürün ve günlük satış/iade serisi.
- AI çıktısı: teşhis, öncelikli fırsatlar, 30 günlük yol haritası, satış artırma taktikleri, fiyat/stok/iade değerlendirmesi, içerik/görsel önerileri, test planı, eksik veri ve uyarılar.
- Son 20 AI analizi tarayıcıda önbelleğe alınır. Yeniden Analiz Et ile güncel verilerle tekrar çağrılır.

## Vercel ayarı
Vercel > Project > Settings > Environment Variables bölümüne:

- `OPENROUTER_API_KEY` = OpenRouter API anahtarınız
- İsteğe bağlı: `OPENROUTER_MODEL` = `openrouter/free`

Ekledikten sonra projeyi yeniden deploy edin.

API anahtarı istemci HTML/JavaScript içine yazılmaz ve `/api/ai/status` cevabında gösterilmez.

## Sunucu API'leri
- `GET /api/ai/status`
- `POST /api/ai/product-roadmap`

## Güvenlik ve kontrol
AI yalnızca öneri/analiz üretir. Fiyat, stok veya içerik değişiklikleri doğrudan mağazaya uygulanmaz; mevcut SENİN ONAYIN akışı korunur.

## Test
- 33/33 otomatik test başarılı.
- Yerel ana sayfa: HTTP 200.
- `/api/ai/status`: HTTP 200.
- API anahtarı yokken analiz: kontrollü HTTP 503 ve açıklayıcı mesaj.
