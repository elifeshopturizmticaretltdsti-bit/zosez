'use strict';
(function(root){
 const num=v=>v===null||v===undefined||v===''||typeof v==='boolean'?null:Number.isFinite(Number(v))?Number(v):null;
 function identity(o){const slot=String(o.marketplaceCode||'TY1');const packageId=o.shipmentPackageId??o.raw?.id??o.raw?.shipmentPackageId;return {slot,packageId:packageId==null?'':String(packageId),orderNumber:String(o.orderNumber??o.raw?.orderNumber??'')};}
 function snapshot(o,company){const p=o.raw||{},a=p.invoiceAddress,id=identity(o);if(!a)throw Error('Siparişin fatura adresi eksik. Teslimat adresi yerine kullanılmadı.');if(!String(company||'').trim())throw Error('Taslak için firma unvanınızı girin.');
 const status=String(p.status||p.shipmentPackageStatus||o.status||'').toLowerCase();if(['awaiting','cancelled','canceled','returned','unsupplied','unpacked'].includes(status)||/iptal|iade/.test(status))throw Error('Bu sipariş durumu için taslak oluşturulamaz.');
 return {version:1,createdAt:new Date().toISOString(),orderNumber:id.orderNumber,packageId:id.packageId,currency:p.currencyCode||'TRY',seller:{company:String(company).trim(),address:'',taxNumber:'',taxOffice:''},buyer:{name:a.company||a.fullName||[a.firstName,a.lastName].filter(Boolean).join(' ')||o.customer||'',address:[a.fullAddress||a.address1,a.address2,a.district,a.city,a.postalCode].filter(Boolean).join(' '),taxNumber:a.taxNumber||'',taxOffice:a.taxOffice||''},lines:(p.lines||[]).map(l=>({title:l.productName||l.name||'—',barcode:String(l.barcode||''),quantity:num(l.quantity),unitPrice:num(l.price),vatRate:num(l.vatRate)})),total:num(p.totalPrice),note:'FATURA TASLAĞI — Resmî fatura değildir. e-Fatura/e-Arşiv olarak düzenlenmemiştir. Tutarlar siparişten alınmıştır; KDV hesaplanmamıştır.'};
 }
 const api={identity,snapshot};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LegacyInvoiceCore=api;
})(typeof window==='undefined'?{}:window);
