(function()
{
  "use strict";
  var isEnumerable = {}.propertyIsEnumerable

  if (typeof Object.deepAssign == "function") return

  function isObject(value) {
      return value != null && typeof value === 'object';
    }

  Object.defineProperty(Object, "deepAssign",
  {
    value: function deepAssign(target, sources)
    {
      if (target == null) throw new TypeError('Target object cannot be null');

      var to = Object(target);

      for (var index = 1; index < arguments.length;)
      {
        var from = arguments[index++];
        if (isObject(from)){
          Reflect.ownKeys(from).forEach(function(key)
          {
            if (isEnumerable.call(from, key)) {

              if(isObject(to[key]) && isObject(from[key])) {

                to[key] = Object.deepAssign(to[key], from[key]);

              } 
              else if(isObject(to[key]) && from[key] instanceof Date ||
                                           from[key] instanceof RegExp ||
                                           from[key] instanceof Map ||
                                           from[key] instanceof Set){
                to[key] = new from[key].constructor(from[key]);
              }
              else {
              to[key] = from[key];
              }
            }
          })
        }
        else{
          console.log("Not an object");
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  })
})()

Object.deepAssign({a: {b: 0}}, {a: {b: 1, c: 2}}, {a: {c: 3}});
                          /*     {a: {b: 1, c: 3}}*/