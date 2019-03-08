/*
  Filename: frontplaser.js
  Descr: The library entry point don't put your new fonctions here.
  User: Thomas LE GOFF
  Date: 08/3/2019
*/

function FrontPlaster(){
    this.version = "1.0.0"; 
}

FrontPlaster.prototype.init = function(callback){
    callback();
}; 

FrontPlaster.prototype.update = function(window=null, callback){
    window.document.onload = callback();
}


