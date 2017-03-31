

/**
 * 生成排好序需要签名的字符串
 * @param map
 */
export function getSortSignStr(map)
{
    var keys = [];
    var i = 0;
    for (var key of map.keys()) {
      //console.log(key);
      keys[i] = key;
      i++;
    }

    Array.sort(keys);
    var j = 0;
    var sortstr = "";
    for (var itemmap of map) {
      if (map.get(keys[j]) != null) {
        sortstr = sortstr + keys[j] +"="+ map.get(keys[j]) + "&";
        j++;
      }
    }
    //console.log("sort:" + sortstr);
    return sortstr.substring(0, sortstr.length -1);
}


