var Saibo = function(){

  var self = this;

  this.cells = {};

  this.add = function(key){
    if(typeof self.cells[key] !== 'undefined'){
      return self.cells[key];
    }
    var c = new Cell(key, self);
    this.cells[key] = c;
    return c;
  };

  this.find = function(key){
    if(typeof self.cells[key] !== 'undefined'){
      return self.cells[key];
    }
    return false;
  };

  this.val = function(key){
    if(typeof self.cells[key] !== 'undefined'){
      return self.cells[key].val();
    }
    return false;
  };

  this.all = function(){
    for(var i in this.cells){
      console.log(this.cells[i].key + ' = ' + this.cells[i].val());
    }
  };

  // set cell or map of key value pairs, creating if not exists
  this.set = function(key, value){
    if(typeof key === 'object'){
      for(var i in key){
        self.set(i, key[i]);
      }
      return;
    }

    if(typeof self.cells[key] === 'undefined'){
      self.add(key);
    }
    return this.cells[key].set(value);
  };

  // bind an event listener to a cell to be triggered when it's value
  // changes
  this.on = function(key, callback){
    if(typeof self.cells[key] === 'undefined'){
      self.add(key);
    }
    self.cells[key].on(callback);
  }

  var Cell = function(key, org){

    var self = this;

    this.org = org;
    this.key = key;
    this.listeners = [];
    this.value = null;

    this.timer_fn = null;
    this.timer_ms = null;

    this.on = function(fn){
      self.listeners.push(fn);
    };

    // add a periodic functino to the cell
    this.timer = function(ms, fn){
      this.timer_ms = ms;
      this.timer_fn = function(){
        self.set(fn.call(self));
      };
      this.doTimer();
    };
    
    this.doTimer = function(){
      self.timer_fn();
      setTimeout(self.doTimer, self.timer_ms);
    };

    this.set = function(value){
      self.value = value;
      for(var i=0, ii=self.listeners.length; i < ii; i++){
        self.listeners[i].call(self, self.val());
      };
      return this;
    }
    this.fn = null;

    this.val = function(v){
      //if param, set value to it
      if(typeof v !== 'undefined'){
        self.set(v);
        return self.value;
      }
      return (self.fn) ? self.calc() : self.value;
    }

    this.calc = function(){
      if(!self.keys){
        return self.fn();
      }
      var args = [];
      for(var i=0, ii = self.keys.length; i<ii; i++){
        args.push(org.val(self.keys[i]));
      }
      return self.fn.apply(self, args);
    }

    this.formula = function(fn, keys){
      self.fn = fn;
      self.keys = keys;
      if(!keys || keys.length===0){
        return;
      }
      for(var i=0, ii=self.keys.length; i < ii; i++){
        self.org.on(keys[i], function(){          
          self.set(self.fn);
        });
      }
    };
  }

};
