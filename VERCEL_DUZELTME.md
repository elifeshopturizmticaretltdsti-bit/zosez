# Vercel ENOENT düzeltmesi

Önceki pakette yerel HTTP sunucusu Vercel'de çalıştırıldığında `/var/task/index.html`
aranıyordu. Yeni vercel.json dağıtımı açıkça tanımlar: index.html ve assets statik,
yalnızca mevcut iki API dosyası sunucusuz fonksiyon olur. server.cjs Vercel
dağıtım girdisi değildir; yalnızca bilgisayarda npm start için kalır.

ZIP'i açıp içeriğini proje köküne koyun. index.html, vercel.json, package.json,
api ve lib aynı seviyede olmalı. Mevcut vercel.json dosyasını mutlaka değiştirin.
Vercel'de Root Directory bu klasörü göstermeli. Yeniden Deploy edin; önceki
build cache seçeneğini kapatın. Özel bir Start Command tanımladıysanız kaldırın.

Yerel kod testleri başarılı; bu düzeltme Vercel hesabınızda henüz doğrulanmadı.
