// Shared by manual refresh and webhook polling. Inputs are normalized orders.
function mergeOrderRows(existing,incoming){
  const market=o=>String(o.marketplaceCode||'TY1').toUpperCase();
  const packageId=o=>o.shipmentPackageId??o.packageId??o.raw?.shipmentPackageId??o.raw?.id;
  const orderId=o=>String(o.orderNumber??'');
  const valid=o=>o&&typeof o==='object'&&orderId(o)&&orderId(o)!=='-';
  const key=o=>market(o)+'|'+(packageId(o)!=null?'package:'+packageId(o):'order:'+orderId(o));
  const modified=o=>Number(o.lastModifiedDate||o.raw?.packageLastModifiedDate||o.raw?.packageModificationDate||o.raw?.lastModifiedDate||0);
  const rows=new Map();
  for(const o of Array.isArray(existing)?existing:[])if(valid(o))rows.set(key(o),o);
  for(const o of Array.isArray(incoming)?incoming:[]){
    if(!valid(o))continue;
    const k=key(o);let previous=rows.get(k),previousKey=k;
    if(!previous){
      const matches=[...rows].filter(([,old])=>market(old)===market(o)&&orderId(old)===orderId(o));
      if(matches.length===1&&(packageId(o)==null||packageId(matches[0][1])==null)){
        [previousKey,previous]=matches[0];
      }
    }
    if(previous&&modified(o)&&modified(previous)&&modified(o)<modified(previous))continue;
    const merged={...previous,...Object.fromEntries(Object.entries(o).filter(([,v])=>v!==undefined))};
    // An aggregate update must not discard a known shipment identity.
    if(previous&&packageId(o)==null&&packageId(previous)!=null)merged.shipmentPackageId=packageId(previous);
    if(previous)rows.delete(previousKey);
    rows.set(key(merged),merged);
  }
  return [...rows.values()].sort((a,b)=>(Number(b.timestamp)||0)-(Number(a.timestamp)||0));
}
function mergeOrders(incoming){state.orders=mergeOrderRows(state.orders,incoming);return state.orders}
if(typeof module==='object'&&module.exports)module.exports={mergeOrderRows};
