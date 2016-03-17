<p align="center">
<a href="https://www.npmjs.com/package/vue-expanding-preview"><img src="https://img.shields.io/npm/dm/vue-expanding-preview.svg" alt="Downloads per month"></a>
<br/>
 <a href="https://www.npmjs.com/package/vue-expanding-preview"><img src="https://img.shields.io/npm/v/vue-expanding-preview.svg" alt="Latest npm release"></a>
</p>

#Intro

Reusable expanding preview window for use with grids.

__Warning__: This project is still under development. Contributions are welcome

#Usage
```js
// browserify/webpack require
var ep = require('vue-expanding-preview')
  
  var app = new Vue({
  components: {
        'vue-expanding-preview': ep
    },
})
```

```html
<vue-expanding-preview :selector-id.sync='/**-1 for not shown, set to your id of the item to insert after **/'>
    <div slot='content'>
    </div>
</vue-expanding-preview>
```
