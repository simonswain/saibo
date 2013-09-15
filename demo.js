document.onreadystatechange = function() {
  if (document.readyState === 'complete') {

    var cells = new Saibo();

    document.getElementById('width').onchange = function(e){
      cells.set('width', Number(e.target.value));
    };

    document.getElementById('height').onchange = function(e){
      cells.set('height', Number(e.target.value));
    };

    cells.on('area', function(x){
      document.getElementById('area').innerHTML = x;
    });

    cells.on('time', function(x){
      document.getElementById('time').innerHTML = x;
    });

    cells.set('time', 0)
      .timer(1000, function(){
        return Number(this.val()) + 1;
      });

    cells.set('width', 200);
    cells.set('height', 100);

    cells.all();

    cells.add('area')
      .formula(function(width, height){
        return width * height;
      }, ['width','height']);

    cells.on('area', function(x){
      console.log('Area', x);
    });

    console.log('Area', cells.val('area'));

    cells.set('height', 250);
    cells.set('height', 370);
    //cells.set('width', 501);



  }
};
