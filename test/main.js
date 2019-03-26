var fp;

function setup(){
    fp = new FrontPlaster(1920, 1080, "frontplaster_canvas", "frontplaster_div", WEBGL);
    var sceneTest = new Scene("test");
    sceneTest.addWidget(bublesWidget);
    sceneTest.addWidget(mouseDrawerWidget);
    sceneTest.addWidget(clockWidget);
    fp.addScene(sceneTest);
    fp.init();
}

function draw(){
    fp.update();
}

function windowResize(){
    fp.resize();
}



