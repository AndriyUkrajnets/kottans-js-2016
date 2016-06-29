/*Написать Promise.map, Promise.some и Promise.reduce. Должно работать как в доках блуберда: 
http://bluebirdjs.com/docs/api-reference.html. 
Тесты: https://github.com/petkaantonov/bluebird/tree/master/test/mocha
Промис нужно сабклассить. Promise.all не юзать. Брать конструктор промиса из this

http://bluebirdjs.com/docs/api/map.html :
Promise.map(
    Iterable<any>|Promise<Iterable<any>> input,
    function(any item, int index, int length) mapper,
    [Object {concurrency: int=Infinity} options]
) -> Promise*/

'use strict'
class MyPromise extends Promise
{
  static map(input, mapper)
  {
    return new this.constructor((resolve, reject) =>
    {
      let result = []
      console.log('result' + result)
      let done = 0
      for (let promise of input)
        if(typeof promise.then == 'function'){
          pending++
          promise.then(value =>
          {
            result.push(mapper(value))
            if (! --pending)
            resolve(result)
          },  reject)
      } else {
        result.push(mapper(promise))
        if (! pending)
          resolve(result)
      }
    })
  }
}

/*let names = ['a', 'b','c'];
let newNames = MyPromise.map(names, name);
console.log(name);*/