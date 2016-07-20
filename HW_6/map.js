'use strict'

class MyPromise extends Promise{
   
  constructor(...args){
    super(...args);
      return this;
  }
  
  static map(arr, func){

    if(!(arr instanceof Array)){
        throw new Error;
      }
      return new this((res, rej) => {
        
      var isRejected = false;
        var result = [];
        arr.forEach(function(value){
          if(typeof value.then == "function"){
            value.then(value => result.push(func(value)))
                 .catch(isRejected = true);
          }else{
            result.push(func(value));
          }
        })
      isRejected ? rej('Rejected?') : res(result);
    })
  }
}

const arr = [1,2,3];
const arrMultiplication = MyPromise.map(arr, (a) =>{
   return a*a; });
console.log(arrMultiplication);