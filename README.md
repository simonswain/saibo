# Saibo

See the [Saibo Project Page](http://simonswain.github.io/saibo/ "Saibo Project Page") for more examples.

A simple library for reactive programming in the browser or Node.js

Saibo lets you make a network of cells (like a key-value store). 

Cells can either hold a value, or a formula that derives their value
from other cells.

Cells can trigger event listeners when their values change.

Formulas can use values from other cells, with their values updating
and triggering event handler when cells they depend on change.

Cells can have a timer function to set their value at a regular
interval.

# Usage

Create a new network of cells:

```javascript
var cells = new Saibo();
```

Add a cell:

```javascript
cells.add('foo');
```

Set a cell's value:

```javascript
cells.set('foo', 23);
```

Get a cell's value:

```javascript
var q = cells.val('foo'); // q = 23
```

Find a cell and set it's value:

```javascript
cells.find('foo').set(23);
```

Or get it's value:

```javascript
var q = cells.find('foo').val(); // q = 23
```

Iterate all cells with a callback:

```javascript
cells.each(function(value, key){
  console.log(key + ' = ' + value);
};
```

Setting a non-existant cell will create it.

```javascript
cells.set('bar', 23);
```

Attach a listener to trigger when a cells value changes:

```javascript
cells.on('foo', function(x){
  console.log('foo = ' + x);
});

cells.set('foo', 46);

// foo = 46
```

Create a new cell whose value is derived from other cells:

The keys of the cells named in the array are passed to the callback
function in the order given. Your callback must return the new value
of the cell. The function will be called whenever required to provide
the cell's value.

```javascript
cells.add('area')
  .formula(function(width, height){
    return width * height;
  }, ['foo','bar']);
```

Cells don't have to be numeric.

```javascript
cells.set('device', 'Roland');
});
```

Adding a timer will cause a cell to run your callback every `n`
milliseconds, emitting the value you return from the callback.

Within the callback, `this` is your cell. You can do things like
`this.val()` to get it's value.

Whatever your callback returns will become the new value of the cell.

```javascript
cells.on('time', function(x){
  console.log(x);
});

cells.set('time', 0)
  .timer(1000, function(){
    return Number(this.val()) + 1;
});
```
