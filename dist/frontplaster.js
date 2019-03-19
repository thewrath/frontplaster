/*
    Regles de nommages : 
        object => CamelCase 
        function => camelCase 
        variable  => snake_case 
*/
//Main lib 
var FrontPlaster = function (window_width, window_height, canvas_id, div_id, type) {
  this.scenes = new Array();
  this.canvas = null;
  this.canvas_id = canvas_id;
  this.canvas_type = type;
  this.div = document.getElementById(div_id);
  this.current_scene_index = 0;
  this.window_width = window_width;
  this.window_height = window_height;
};

FrontPlaster.prototype.init = function () {
  //P5.js init 
  {
    createCanvas(this.window_width, this.window_height, this.canvas_type);
  } //HTML initialisation

  {
    document.getElementById("defaultCanvas0").id = this.canvas_id;
    this.canvas = document.getElementById(this.canvas_id);
    this.canvas.style.position = "fixed";
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.zIndex = 1;
    this.div.style.position = "relative";
    this.div.style.zIndex = 2;
  }
  this.scenes.forEach(scene => scene.init());
};

FrontPlaster.prototype.update = function () {
  if (this.scenes[this.current_scene_index] != null) {
    this.scenes[this.current_scene_index].update();
  }

  ;
};

FrontPlaster.prototype.resize = function () {
  //P5.js resize
  {
    resizeCanvas(this.window_width, this.window_height);
  }
};

FrontPlaster.prototype.addScene = function (scene) {
  this.scenes.push(scene);
};

FrontPlaster.prototype.removeScene = function (name) {
  if (this.scenes.find(name)) {
    let index = this.scenes.findIndex(name);
    this.scenes.splice(index, 1);

    if (this.current_scene_index === index) {
      this.nextScene();
    }
  }
};

FrontPlaster.prototype.nextScene = function () {
  this.current_scene_index < this.scenes.length - 1 ? this.current_scene_index++ : this.current_scene_index = 0;
};

FrontPlaster.prototype.previousScene = function () {
  this.current_scene_index > 0 ? this.current_scene_index-- : this.current_scene_index = this.scenes.length - 1;
}; //Scene 


var Scene = function (name) {
  this.widgets = new Array();
};

Scene.prototype.init = function () {
  this.widgets.forEach(widget => widget.init());
};

Scene.prototype.update = function () {
  background("#FFF");
  this.widgets.forEach(widget => {
    //add scale and rotation 
    push();
    translate(widget.getPosition()[0], widget.getPosition()[1]);
    widget.update();
    translate(widget.getPosition()[0], widget.getPosition()[1]);
    pop();
  });
};

Scene.prototype.addWidget = function (widget) {
  widget.init();
  this.widgets.push(widget);
};

Scene.prototype.removeWidget = function () {};

Scene.prototype.addHtml = function () {};

Scene.prototype.removeHtml = function () {};

Scene.prototype.delete = function () {}; //Widget


var Widget = function (name, x, y) {
  this.name = name;
  this.x = x;
  this.y = y;
};

Widget.prototype.init = function () {};

Widget.prototype.update = function () {};

Widget.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
};

Widget.prototype.getPosition = function () {
  return new Array(this.x, this.y);
};

Widget.prototype.delete = function () {};
//bubles widget
var bublesWidget = new Widget("bubles", 0, 0);
var bulles = [];

bublesWidget.init = function () {
  for (var i = 0; i < 100; i++) {
    bulles[i] = new UsineABulle();
    bulles[i].creation();
  }

  ;
};

bublesWidget.update = function () {
  for (var i = 0; i < bulles.length; i++) {
    bulles[i].redessine();
  }

  ;
};

function UsineABulle() {}

;
UsineABulle.prototype = {
  creation: function () {
    this.x = width / 2;
    this.y = height / 2;
    this.vitx = random(-5, 5);
    this.vity = random(-5, 5);
    this.diam = random(10, 50);
    this.coulR = random(0, 255);
    this.coulV = random(0, 255);
    this.coulB = random(0, 255);
  },
  redessine: function () {
    fill(this.coulR, this.coulV, this.coulB);
    ellipse(this.x, this.y, this.diam, this.diam);
    this.x = this.x + this.vitx;
    this.y = this.y + this.vity;

    if (this.x > width - this.diam / 2) {
      this.vitx = -1 * Math.abs(this.vitx);
    }

    if (this.x < this.diam / 2) {
      this.vitx = Math.abs(this.vitx);
    }

    if (this.y > height - this.diam / 2) {
      this.vity = -1 * Math.abs(this.vity);
    }

    if (this.y < this.diam / 2) {
      this.vity = Math.abs(this.vity);
    }
  }
};
//bubles widget
var clockWidget = new Widget("clock", 0, 0);

clockWidget.init = function () {
  stroke(255);
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;
  cx = width / 2;
  cy = height / 2;
};

clockWidget.update = function () {
  // Draw the clock background
  noStroke();
  fill(244, 122, 158);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(237, 34, 93);
  ellipse(cx, cy, clockDiameter, clockDiameter); // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top

  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI; // Draw the hands of the clock

  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius); // Draw the minute ticks

  strokeWeight(2);
  beginShape(POINTS);

  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }

  endShape();
};
//bubles widget
var mouseDrawerWidget = new Widget("mouseDrawer", 0, 0);

mouseDrawerWidget.init = function () {};

mouseDrawerWidget.update = function () {
  var speed = (abs(pmouseX - mouseX) + abs(pmouseY - mouseY)) / 2;
  fill(255, 0, 0, 50);
  noStroke();
  ellipse(mouseX, mouseY, speed, speed);
};