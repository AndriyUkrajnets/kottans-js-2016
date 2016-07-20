'use strict'

class MyPromise extends Promise{

  constructor(...args){
      super(...args);
        return this;
    }

  static reduce(iterable, reducer, initial){

    return new this((resolve, reject) =>
    {
      let result = [];
      let arr = [];
      let pending = 0;
      let counter = 0;

      for (let promise of iterable) {

        if (typeof promise.then == 'function') {
          pending++
          promise.then(value =>
          {
            result.push(value)
            pending--
            if (!pending) {
              for(let item of arr) {
                result.splice(item.index, 0, item.value)
              }
              if(initial) {
                result = result.reduce((before, current, index, array) => {
                  return reducer(before, current, index, array)
                }, initial)
              } else {
                result = result.reduce((before, current, index, array) => {
                  return reducer(before, current, index, array)
                })
              }
              resolve(result)
            }
          },  reject)

        } else {
          arr.push({value: promise, index: counter})
        }
        counter++
      }
  
      if (!pending) {
        for(let item of arr) {
          result.splice(item.index, 0, item.value)
        }
        if(initial) {
          result = result.reduce((before, current, index, array) => {
            return reducer(before, current, index, array)
          }, initial)
        } else {
          result = result.reduce((before, current, index, array) => {
            return reducer(before, current, index, array)
          })
        }
        resolve(result)
      }
    })
  }
}

const arr = [Promise.resolve(2), Promise.resolve(5), Promise.resolve(1), Promise.resolve(8), Promise.resolve(6)];
const reduceResult = MyPromise.reduce(arr, (item, sum) =>{
   return sum + item;
}, Promise.resolve(1));
console.log(reduceResult)
