//bubles widget
var circleWidget = new Widget("circle", 0, 0);

circleWidget.init = function () {};

circleWidget.update = function () {
  fill(50);
  ellipse(0, 0, 16, 16);
};