
export function json2Form(json){
  var str = [];
  for(var p in json){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&")
}


export function strMapToObj (strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}


export function strMapToJson (strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
