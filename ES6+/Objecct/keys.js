// ! object.keys()

function keys(object) { 
  var result, key, result = [];
  for (key in object){
      if (object.hasOwnProperty(key))  result.push(key)
  }

  return result;
}