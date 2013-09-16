var Saibo = require('./saibo.js');

var cells = new Saibo();

cells.add('area')
  .formula(function(width, height){
    return Number(width) * Number(height);
  }, ['width','height']);

cells.on('area', function(x){
  console.log('Area', x);
});

cells.set('width', 10);
cells.set('height', 20);

cells.each(function(x, i){
  console.log(i + ' = ' + x);
});
