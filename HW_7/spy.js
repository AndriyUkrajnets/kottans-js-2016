function Spy(target, method) {
  let spyCount = {count: 0};
  let call = target[method];
  target[method] = function() {
    spyCount.count++;
    return call.apply(target, arguments);
  };
  return spyCount;
}

var console = {
  error(arg){
    return arg;
  }
};

module.exports = Spy

var spy = Spy(console, 'error')
console.error('calling console.error')
spy.count