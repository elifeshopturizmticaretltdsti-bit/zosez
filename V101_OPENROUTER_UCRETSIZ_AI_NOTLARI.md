# ELIFESHOP V101 — OpenRouter Ücretsiz AI + AI'sız Yedek Motor

## Vercel Environment Variables

Zorunlu (ücretsiz AI için):
- `OPENROUTER_API_KEY` = OpenRouter API anahtarınız

İsteğe bağlı:
- `OPENROUTER_MODEL` = `openrouter/free`

Eski `OPENAI_API_KEY` / `OPENAI_MODEL` değişkenleri bu sürümde ürün yol haritası için kullanılmaz. Silmek zorunda değilsiniz; ancak yanlış anlaşılmayı önlemek için kaldırabilirsiniz.

## Çalışma sırası

1. `OPENROUTER_API_KEY` varsa OpenRouter `openrouter/free` modeli denenir.
2. OpenRouter başarılıysa rapor ücretsiz AI ile oluşturulur.
3. OpenRouter kota, rate limit, model, ağ veya JSON hatası verirse istek hata ekranında kalmaz.
4. Sistem aynı ürün için otomatik olarak AI'sız yerel karar motoruna geçer.
5. `OPENROUTER_API_KEY` hiç yoksa doğrudan AI'sız karar motoru çalışır.

## Güvenlik

- API anahtarı HTML/JavaScript içine gönderilmez.
- Anahtar yalnızca Vercel sunucu fonksiyonunda okunur.
- AI'ya müşteri adı, telefon, e-posta veya adres gönderilmez.
- Yalnızca ürün performans verileri gönderilir: satış, iade, stok, fiyat, görüntülenme/favori/yorum gibi ürün metrikleri.

## API

- `GET /api/ai/status`
- `POST /api/ai/product-roadmap`

OpenRouter endpoint: `https://openrouter.ai/api/v1/chat/completions`
Varsayılan model: `openrouter/free`

## Doğrulama

- 42/42 otomatik test başarılı.
- OpenRouter başarılı yanıt testi başarılı.
- OpenRouter 429 hata durumunda AI'sız yedek moda geçiş testi başarılı.
- API anahtarı yokken yerel ürün yol haritası testi başarılı.
