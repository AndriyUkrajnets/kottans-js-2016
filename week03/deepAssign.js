function deepAssign(target, source) {
  "use strict"

  function isObject(value) {
    return value != null && typeof value === 'object'
    }

  var to = Object(target)
  for ( var index = 1; index < arguments.length ;){
    
    var from = arguments[index++]
    var keysOnly = Object.keys(Object(from));
    for(var key = 0; key < keysOnly.length; ){
      var isObjectTest = from[keysOnly[key++]]
      if(isObject(isObjectTest)) {
          if( keysOnly[key] in to){
            to[keysOnly[key]] = deepAssign(to[keysOnly[key]], from[keysOnly[key]])
          }else{
            to[keysOnly[key]] = deepAssign({}, from[keysOnly[key]])
         }
      }else{
        to[keysOnly[key]] = from[keysOnly[key]]
      }
    }
  }
  return to
}

a={a:1,b:"in a string"};b={c:"in b string",d:{x:3}, e:{f:"in b second string", g:{h:4, i:"in b third string"}}};
console.log(deepAssign(a,b))