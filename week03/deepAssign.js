(function()
{
    "use strict"

    if (typeof Object.deepAssign == "function") return

    var isEnumerable = {}.propertyIsEnumerable

    function isObject(value){
      return value != null && typeof value === 'object'
      }

    Object.defineProperty(Object, "deepAssign",{
        value: function deepAssign(target, sources){
            if (target == null) throw new TypeError

            var to = Object(target)

            for (var index = 1; index < arguments.length ;){
              var from = arguments[index++]

              if(from === isObject(from)){
                Object.keys(Object(from)).forEach(function(key){
                  if (isEnumerable.call(from, key))
                  to[key] = deepAssign(from[key], from[key])
                })
              }
              else{
                Object.keys(Object(from)).forEach(function(key){
                    if (isEnumerable.call(from, key))
                        to[key] = from[key]
                })
              }
            }
          return to
        },
        writable: true,
        configurable: true
    })
})()
