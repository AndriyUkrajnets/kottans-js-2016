"use strict"

const PostHTML = require("posthtml")
const html = 
`<div class="container-fluid">
  <h1>Hello World!</h1>
  <p>see the effect</p>
  <div class="row">
    <div class="col-sm-4" style="background-color:lavender;">.col-sm-4</div>
    <div class="col-sm-4" style="background-color:lavenderblush;">.col-sm-4</div>
    <div class="col-sm-4" style="background-color:lavender;">.col-sm-4</div>
  </div>
  <div class="row">
    <div class="col-xs-9 col-md-7" style="background-color:red;">.col-xs-9 .col-md-7</div>
    <div class="col-xs-3 col-md-5" style="background-color:lavender;">.col-xs-3 .col-md-5</div>
  </div>
  <div class="mix">
    <div class="js-tets"></div>
    <div class="js-first js-second"></div>
    <div class="col-lg-12" ></div>
    <div class="col-lg-12 js-tets" ></div>
    <div class="collll-lg-12" ></div>
    <div class="col-xs-11" ></div>
    <div class="col-xs-111" ></div>
    <div class="col-sm-push-1" ></div>
    <div class="col-lg-offset-11" ></div>
    <div class="col-lg-offffset-11" ></div>
  </div>
</div>
`

const plugin = tree => {
  tree.match({attrs: {class: true}}, node => {

    const bootstrapClass = /^col\-(xs|sm|md|lg)(\-(push|pull|offset))?-\d+/i
    const jsInClass = /^js\-\w+/i
    let classesNew = node.attrs.class.split(" ");
    classesNew = 
    classesNew.reduce(( before, current ) => {

      /*console.log("datajs: " + datajs)*/
      /*console.log("before.datajs: " + before.datajs)
      console.log("before.datajs.length:  " + before.datajs.length)*/
      /*console.log("current: " + current)*/
      /*console.log("before: " + before)*/
      let len = before.datajs.length;
      if (jsInClass.test(current)) {

        let afterJs = 
        /-\w*/.exec(current);
        /*console.log("afterJs: " + afterJs)*/
        before.datajs[len] = afterJs[0].substring(1);
        /*console.log("before.datajs[len]: " + before.datajs[len])*/
      } else if (!bootstrapClass.test(current)) {
        before.class[len] = current        
      }
        /*console.log("before: " + before)*/
        return before
      }, {datajs: [], class: []}
      )

      if (classesNew.datajs.length > 0) {
        node.attrs['data-js'] = classesNew.datajs.join(" ")
      }

      if (classesNew.class.length > 0) {
        node.attrs.class = classesNew.class.join(" ")
      } else {
        delete node.attrs.class
      }   

    return node       
  })
}

PostHTML()
  .use(plugin)
  .process(html)
  .then( result => {
      console.log(result.html)
    })