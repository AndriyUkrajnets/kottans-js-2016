function some(arr, count) {
  var rejected = [];
  var result = [], counter = 0;

  if (!(arr instanceof Array && arr.length >= count)) {
    throw new Error;
  }

  return new Promise((res, rej) => {
    
  arr.forEach(value => {
    if (typeof value.then == "function") {
      value.then(value => {

          if (result.length < count) {
          result.push(value)
          counter++

          if(arr.length === counter) {
            res(result);
          }
        }
      }).catch(err => rejected.push(err))
      } else if (result.length > count) {
        result.push(value)
        counter++
        if(arr.length === counter) {
        res(result);
        }
      }
    })
  })
}

some([new Promise((res, rej) => res(5)), new Promise((res, rej) => res(6))], 2)