//bubles widget
var mouseDrawerWidget = new Widget("mouseDrawer", 0,0);

mouseDrawerWidget.init = function(){
    
}

mouseDrawerWidget.update = function(){
    var speed=(abs(pmouseX-mouseX)+abs(pmouseY-mouseY))/2

    fill(255,0,0,50)
    noStroke()
    ellipse(mouseX, mouseY, speed, speed);
}

