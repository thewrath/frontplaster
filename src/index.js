/*
    Regles de nommages : 
        object => CamelCase 
        function => camelCase 
        variable  => snake_case 
*/

//Main lib 
var FrontPlaster = function(window_width, window_height, canvas_id, div_id, type){
    this.scenes = new Array();
    this.canvas = null;
    this.canvas_id = canvas_id;
    this.canvas_type = type;
    this.div = document.getElementById(div_id);
    this.current_scene_index = 0;

    this.window_width = window_width;
    this.window_height = window_height;
}

FrontPlaster.prototype.init = function(){
    //P5.js init 
    {
        createCanvas(this.window_width, this.window_height, this.canvas_type);
    }

    //HTML initialisation
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

}

FrontPlaster.prototype.update = function(){
    if(this.scenes[this.current_scene_index] != null){this.scenes[this.current_scene_index].update();};
}

FrontPlaster.prototype.resize = function(){
    //P5.js resize
    {
        resizeCanvas(this.window_width, this.window_height);       
    }
}

FrontPlaster.prototype.addScene = function(scene){
    this.scenes.push(scene); 
}

FrontPlaster.prototype.removeScene = function(name){
    if(this.scenes.find(name)){
        let index = this.scenes.findIndex(name);
        this.scenes.splice(index, 1);
        if(this.current_scene_index === index){
            this.nextScene();
        }
         
    }
}

FrontPlaster.prototype.nextScene = function(){
    (this.current_scene_index < this.scenes.length-1)?this.current_scene_index++:this.current_scene_index=0;
}

FrontPlaster.prototype.previousScene = function(){
    (this.current_scene_index > 0)?this.current_scene_index--:this.current_scene_index=this.scenes.length-1;
}

//Scene 
var Scene = function(name){
    this.widgets = new Array(); 
}

Scene.prototype.init = function(){
    this.widgets.forEach(widget => widget.init());
}

Scene.prototype.update = function(){
    background("#FFF");
    this.widgets.forEach(widget => {
        //add scale and rotation 
        push();
        translate(widget.getPosition()[0], widget.getPosition()[1]);
        widget.update()
        translate(widget.getPosition()[0], widget.getPosition()[1]); 
        pop();
    });
    
}

Scene.prototype.addWidget = function(widget){
    widget.init(); 
    this.widgets.push(widget); 

}

Scene.prototype.removeWidget = function(){

}

Scene.prototype.addHtml = function(){

}

Scene.prototype.removeHtml = function(){
    
}

Scene.prototype.delete = function(){

}


//Widget
var Widget = function(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
}

Widget.prototype.init = function(){
    
}

Widget.prototype.update = function(){

}

Widget.prototype.setPosition = function(x,y){
    this.x = x; 
    this.y = y;
}

Widget.prototype.getPosition = function(){
    return new Array(this.x, this.y);
}

Widget.prototype.delete = function(){

}