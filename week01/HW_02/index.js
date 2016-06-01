"use strict"

const PostHTML = require("posthtml")
const html =
`
<a href="/something">Somehting</a>
<a href="https://kottans.org">Kottans</a>
`
const attrs = { href: true, target: false, rel: false }
const links = ["a", "area"].map(tag =>
{
  return{tag, attrs}
})

const isAbsolute = RegExp("^(https?)?://")
const plugin = tree => tree
  .match(links, link =>
    {
      let href = link.attrs.href
      if(isAbsolute.test(href))
      {
        link.attrs.target = "_blank"
        link.attrs.rel = "external"
      }
      return link
    })

PostHTML([plugin])
.process(html)
.then(result =>
  {
    console.log(result.html)
  })
.catch(console.error)