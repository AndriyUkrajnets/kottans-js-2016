class MyPromise extends Promise
{
  static map(iterable)
  {
    return new this.constructor((resolve, reject) =>
    {
      let result = []
      let done = 0

      for (let promise of iterable)
        if(typeof promise.then == 'function'){
          pending++
          promise.then(value =>
          {
            result.push(map(value))
            if (! --pending)
            resolve(result)
          },  reject)
      }
    })
  }
}