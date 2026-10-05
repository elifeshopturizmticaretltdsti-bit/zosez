E-LIFE SHOP V92 — CANLI SİPARİŞ (WEBHOOK + ORDER STREAM)

1) Vercel'e bu klasörü deploy edin.
2) Mevcut Trendyol Seller ID / API Key / API Secret bilgilerini Ayarlar'dan bağlayın.
3) Vercel > Project > Settings > Environment Variables içine:
   TRENDYOL_WEBHOOK_KEY = uzun ve rastgele bir gizli anahtar
4) ÖNERİLEN kalıcı webhook kuyruğu için Vercel Marketplace'ten Upstash Redis bağlayın.
   Sistem KV_REST_API_URL + KV_REST_API_TOKEN veya UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN değişkenlerini otomatik kullanır.
5) Redeploy yapın.
6) Panel > Ayarlar > “⚡ Canlı Siparişi Etkinleştir” butonuna bir kez basın.

Çalışma şekli:
- Trendyol Webhook yeni sipariş ve durum değişikliklerini /api/trendyol/webhook adresine iter.
- Panel webhook kuyruğunu 5 saniyede bir kendi backend'inden kontrol eder. Bu kontrol Trendyol API limitini tüketmez.
- Resmi Order Stream 30 saniyede bir delta kontrolü yapar; webhook kaçırılırsa siparişi tamamlar.
- Siparişler orderNumber ile birleştirilir; eski cache yeni API verisinin üzerine yazılmaz.
- Upstash yoksa webhook alıcısı serverless bellekte geçici çalışabilir; üretimde kalıcı ve güvenilir kullanım için Upstash önerilir.

Güvenlik:
- TRENDYOL_WEBHOOK_KEY tarayıcıya gönderilmez.
- Trendyol webhook çağrıları x-api-key ile doğrulanır.

V95 ÇOKLU PAZARYERİ
- Ayarlar > Pazaryeri API Bağlantıları: Trendyol 1, Trendyol 2, Hepsiburada, N11, ÇiçekSepeti.
- Siparişler ekranı: Tüm Pazaryerleri / Trendyol 1 / Trendyol 2 / Hepsiburada / N11 / ÇiçekSepeti filtreleri.
- ES / KH / MET / YH gruplaması korunur.
- Trendyol 1 ve Trendyol 2 sipariş adaptörü aktiftir.
- Hepsiburada, N11 ve ÇiçekSepeti için kimlik bilgisi kartları hazırdır; gerçek sipariş adaptörü, ilgili mağaza hesabının güncel resmi sipariş API yetkisi/endpoint'i doğrulandıktan sonra etkinleştirilmelidir. Sahte veri üretilmez.


V99: API ayarları düzeltildi: Hepsiburada tek API anahtarı, N11 iki API bilgisi (anahtar + gizli anahtar).
