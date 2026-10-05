# V101 merchantSku → Keskin Hediyelik düzeltmesi

- Sipariş gruplaması artık merchantSku, stockCode, sku, barkod ve eşleşen ürünün ham kodlarını birlikte kontrol eder.
- merchantSku üzerinde MET/Keskin kodu bulunan ürünler KESKİN HEDİYELİK grubuna alınır.
- Trendyol sipariş normalize verisinde merchantSku ve stockCode ayrıca korunur.
- Trendyol 2 / diğer pazar yeri normalize akışında merchantSku ayrıca korunur.
- Mevcut grup öncelikleri ve diğer şirket grupları korunmuştur.
- Otomatik test: 46/46 başarılı.
