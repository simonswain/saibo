document.onreadystatechange = function() {
  if (document.readyState === 'complete') {

    var cells = new Saibo();

    // formula

    cells.on('width', function(x){
      document.getElementById('width').value = x;
    });

    cells.on('height', function(x){
      document.getElementById('height').value = x;
    });

    cells.on('area', function(x){
      document.getElementById('area').innerHTML = x;
    });

    cells.add('area')
      .formula(function(width, height){
        return Number(width) * Number(height);
      }, ['width','height']);

    cells.set('width', 10);
    cells.set('height', 20);

    // timer

    var cro = new Cro('cro');

    cells.on('time', function(x){
      document.getElementById('time').innerHTML = Math.floor(x);
    });

    cells.on('time', function(x){
      cro.set(Math.cos(x) * Math.sin(x/2));
    });

    document.getElementById('width').onchange = function(e){
      cells.set('width', Number(e.target.value));
    };

    document.getElementById('height').onchange = function(e){
      cells.set('height', Number(e.target.value));
    };

    cells.set('time', 0)
      .timer(250, function(){
        return Number(this.val()) + 0.25;
      });

  }
};
