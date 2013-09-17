(function(){
  console.log('!!');
  var Cro = function(id, opts){

    var self = this;

    var el = document.getElementById(id);
    var cid = id + '-canvas';

    var w = el.offsetWidth;
    var h = el.offsetHeight;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", cid);
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    el.appendChild(canvas);

    this.ctx = canvas.getContext("2d");
    console.log('size', w, h, this.ctx);

    this.points = [];
    this.point = 0;

    this.t = 0;
    this.t_max = w;

    this.w = w;
    this.h = h;

    for(var i = 0; i < this.t_max; i++){
      this.points[i] = null;
    }

    this.render = function(){

      var i;
      var points = self.points;
      var min = Infinity;
      var max = -Infinity;
      var x, y, xp, yp;

      for(i = 0; i < self.t_max; i++){
        if (points[i] > max) { 
          max = points[i];
        }
        if (points[i] < min) { 
          min = points[i];
        }
      }   

      var yf = self.h / (max - min);
      if(max - min === 0){
        yf = 1;
      }

      xp = 0;
      yp = self.h - ((points[0] - min) * yf);


      self.ctx.clearRect(0, 0, self.w, self.h);
      self.ctx.beginPath();
      self.ctx.moveTo(xp, yp);
      for(i = 0; i < self.t_max; i++){
        if(points[i] === null) {
          continue;
        };
        x = i;
        y = self.h - ((points[i] - min) * yf);
        if(y !== yp){
          self.ctx.lineTo(x, y);
        }
        xp = x;
        yp = y;
      }
      self.ctx.strokeStyle='#00ffff';
      self.ctx.stroke();

    };

    this.update = function(){
      self.t ++;
      if(self.t > self.t_max){
        self.t = 0;
      }
      self.points[self.t] = self.point;
      self.render();
      setTimeout(self.update, 100);
    };

    this.set = function(val){
      // sample and hold
      self.point = Number(val);
    };

    this.update();

    return this;
  };

  window.Cro = Cro;

}).call(this);
