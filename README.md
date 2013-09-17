# Saibo

A simple library for reactive programming in the browser or Node.js

Saibo lets you make a network of cells (like a key-value store). 

Cells can either hold a value, or a formula that derives their value
from other cells.

Cells can trigger event listeners when their values change.

Formulas can use values from other cells, with their values updating
and triggering event handler when cells they depend on change.

Cells can have a timer function to set their value at a regular
interval.

```javascript
var cells = new Saibo();

cells.set('width', 10);
cells.set('height', 10);

console.log(cells.val('width')); // 10

// calculate area from width * height
cells.add('area')
  .formula(function(width, height){
    return width * height;
  }, ['width','height']);

// when area changes, call function
cells.on('area', function(x){
  console.log('Area', x);
});

cells.set('width', 20);

// Area 200
```

```javascript
cells.on('time', function(x){
  console.log(x);
});

cells.set('time', 0)
  .timer(1000, function(){
    return Number(this.val()) + 1;
});
```