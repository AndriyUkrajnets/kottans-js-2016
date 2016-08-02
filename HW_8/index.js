'use strict';

var http = require('http');

class App {
  constructor() {
    this.functions = [];
  }
  
  use(){
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'function'){ 
          this.functions.push(arguments[i]);
      }
    }
  }

  start(host, port, callback){
    http.createServer((req, res) => {
      for (var i = 0; i < this.functions.length; i++) this.functions[i](req, res);
        }).listen(port, host);
        callback();
  }
}
module.exports = App;