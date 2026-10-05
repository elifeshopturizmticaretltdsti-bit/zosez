# V102 Popup Otomatik Etkileşim

- Ürün popup'ı açıldığında yalnızca seçilen ürün için Trendyol etkileşim taraması otomatik başlar.
- Toplu 788 ürün taraması bu akışta çalışmaz.
- Chrome Toplayıcı bağlıysa kullanıcının Chrome oturumu üzerinden ürün linki okunur; bağlı değilse mevcut Vercel yedeği denenir.
- Popup tarama sırasında durum gösterir ve sonuç geldiğinde kendini yeniler.
- Favori, yorum, puan ve varsa görüntülenme bilgileri güncellenir.
- Hata varsa popup içinde gerçek hata gösterilir ve `Yeniden Dene` butonu sunulur.
- Aynı ürünün popup'ı 5 dakika içinde tekrar açılırsa gereksiz tekrar tarama engellenir; manuel `Şimdi Yenile` kullanılabilir.
