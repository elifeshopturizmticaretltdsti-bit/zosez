(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TrendyolInteractions=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const id=v=>typeof v==='string'?v.trim():Number.isSafeInteger(v)&&v>=0?String(v):'';
 const metric=v=>((typeof v==='number'||typeof v==='string'&&/^\d+$/.test(v))&&Number.isSafeInteger(Number(v))&&Number(v)>=0)?Number(v):null;
 function range(start,end){
  const valid=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(Date.parse(s))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
  if(!valid(start)||!valid(end)||start>end)throw Error('Geçerli bir başlangıç ve bitiş tarihi seçin.');
  return {startDate:Date.parse(start+'T00:00:00+03:00'),endDate:Date.parse(end+'T23:59:59.999+03:00'),start,end};
 }
 function normalize(row){
  if(!row||typeof row!=='object'||!row.contentInfo||!row.productBased||typeof row.productBased!=='object')throw Error('Rapor satırı beklenen contentInfo / productBased yapısında değil.');
  const info=row.contentInfo,m=row.productBased;
  const barcodes=[...new Set([info.barcode,...(Array.isArray(info.barcodes)?info.barcodes:[]),...(Array.isArray(info.barcodeSizes)?info.barcodeSizes:[])].map(v=>id(v&&typeof v==='object'?v.barcode:v)).filter(Boolean))];
  const contentId=id(info.contentId);if(!barcodes.length&&!contentId)throw Error('Rapor satırında ürün kimliği bulunamadı.');
  return {contentId,barcodes,barcode:barcodes[0]||'',favorites:metric(m.currentFavorite),grossFavorites:metric(m.grossFavoriteCount),views:metric(m.totalView),addToBasket:metric(m.totalAddToBaskedCount),metricSource:'Trendyol Business Advisor · productBased'};
 }
 function parsePage(payload,page,pageSize){
  const obj=payload?.data??payload;
  // Known envelope names only: never recursively interpret sellerBased summaries as product rows.
  const rows=Array.isArray(obj)?obj:obj?.content??obj?.items??obj?.interactions??obj?.products;
  if(!Array.isArray(rows))throw Error('Rapor yanıtının liste yapısı tanınmadı; veri alınamadı.');
  const meta=Array.isArray(obj)?{}:obj.pagination??obj.pageable??obj;
  const totalPages=meta.totalPages??obj?.totalPages,total=meta.totalElements??meta.totalCount??obj?.totalElements??obj?.totalCount;
  const pages=metric(totalPages),count=metric(total);
  if(totalPages!=null&&pages===null||total!=null&&count===null)throw Error('Rapor sayfalama bilgisi geçersiz.');
  if(rows.length&&(pages===0||count===0)||count!==null&&rows.length>count)throw Error('Rapor satırları sayfalama toplamıyla tutarsız.');
  const returnedPage=meta.number??obj?.number;
  if(returnedPage!=null&&metric(returnedPage)!==page)throw Error('Rapor beklenen sayfayı döndürmedi.');
  const last=meta.last??obj?.last;
  let more=pages!==null?page+1<pages:count!==null?(page+1)*pageSize<count:typeof last==='boolean'?!last:rows.length>=pageSize;
  if(!rows.length&&more)throw Error('Rapor tamamlanmadan boş sayfa döndü.');
  return {rows:rows.map(normalize),nextPage:more?page+1:null};
 }
 async function collectPages(fetchPage,onProgress=()=>{}){
  const rows=[],seen=new Set();let page=0;
  for(let safety=0;safety<1000;safety++){
   const result=await fetchPage(page);if(!Array.isArray(result.rows))throw Error('Rapor sayfası geçersiz.');
   if(result.rows.length){const signature=JSON.stringify(result.rows);if(seen.has(signature))throw Error('Aynı rapor sayfası tekrarlandı; eksik sonuç uygulanmadı.');seen.add(signature)}
   rows.push(...result.rows);onProgress(page+1,rows.length);
   if(result.nextPage===null)return rows;
   if(result.nextPage!==page+1)throw Error('Rapor sayfa sırası geçersiz.');page=result.nextPage;
  }
  throw Error('Rapor sayfa güvenlik sınırını aştı; eksik sonuç uygulanmadı.');
 }
 function match(products,rows){
  const byBarcode=new Map(),byContent=new Map();
  const add=(map,k,row)=>{if(!k)return;const old=map.get(k);if(!old)map.set(k,[row]);else old.push(row)};
  for(const row of rows){for(const bc of row.barcodes||[])add(byBarcode,id(bc),row);add(byContent,id(row.contentId),row)}
  return products.map(p=>{
   const bc=id(p.barcode||p.raw?.barcode),cid=id(p.contentId??p.raw?.contentId);
   const exact=bc?byBarcode.get(bc):null,candidates=exact||byContent.get(cid)||[];
   // Ambiguous content IDs or barcodes must never be resolved by last-write-wins.
   return {product:p,row:candidates.length===1?candidates[0]:null,matchedBy:candidates.length===1?(exact?'barcode':'contentId'):null};
  });
 }
 return {id,metric,range,normalize,parsePage,collectPages,match};
});
