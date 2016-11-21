(function(ext) {
    // Cleanup function when the extension is unloaded
    var rem;
    var commandid = 0;

    $.getScript("https://shiul93.github.io/robobo-scratch-extension-test/remotelib.js", function(){

   alert("Script loaded but not necessarily executed.");

    });

    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    //Connection Block
    ext.connectToRobobo = function(ip,port) {
        rem = new Remote(ip,port);
        rem.connect(ip,port);
    };

    ext.talkRobobo = function(text){

        rem.talk(text);
    };
    ext.moveRobobo = function(wheel,degrees,speed){
      rem.moveWheelsByDegree(wheel,degrees,speed);
    };

    ext.movePanRobobo = function(degrees){
      rem.movePan(degrees,"10");
    };

    ext.moveTiltRobobo = function(degrees){
      rem.moveTilt(degrees,"10");
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'set Robobo IP %s and port %s','connectToRobobo'],
          [' ', 'say %s','talkRobobo'],
          [' ', 'Move wheel %m.wheels by %s degrees at speed %s','moveRobobo'],
          [' ', 'Move pan to %s','movePanRobobo'],
          [' ', 'Move tilt %s','moveTiltRobobo'],
        ],
        menus: {
          motorDirection: ['forward', 'backward'],
          wheels: ['right', 'left'],
        },
    };


    // Register the extension
    ScratchExtensions.register('Robobo Extension', descriptor, ext);
})({});
