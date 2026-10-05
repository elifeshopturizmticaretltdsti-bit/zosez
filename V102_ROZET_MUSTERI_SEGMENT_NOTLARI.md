# V102 Rozet ve Müşteri Segmentleri

- En çok satan ilk 10 ürün (eşit satışlı sınır ürünleri dahil) ürün tablolarında ve ana sayfada `★★★★★` rozeti alır.
- En çok ürün satın alan tek müşteri `👑 KRAL MÜŞTERİ` olarak işaretlenir.
- Müşteri segmentleri tüm müşteri verisine göre dinamik hesaplanır:
  - KRAL MÜŞTERİ: ürün adedine göre 1. müşteri.
  - VIP: üst %10 içinde en az 3 ürün alan veya 5+ sipariş / 10+ ürün alan müşteriler.
  - SADIK: 2+ sipariş veya 3+ ürün alan müşteriler.
  - YENİ: diğer yeni müşteriler.
- VIP, Sadık, Yeni ve Kral etiketleri farklı renk/stille gösterilir.
- Müşteri popupında da aynı segment ve taç korunur.
- Arama/filtreleme tacı başka müşteriye taşımaz; sıralama tüm müşteri verisine göre yapılır.
