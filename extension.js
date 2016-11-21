(function(ext) {
    // Cleanup function when the extension is unloaded
    var rem;
    var commandid = 0;

    $.getScript("https://shiul93.github.io/robobo-scratch-extension-test/remotelib.js", function(){

   Console.log("Script loaded");

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
    ext.moveRoboboDeg = function(wheel,degrees,speed){
      rem.moveWheelsByDegree(wheel,degrees,speed);
    };
    ext.moveRoboboTime = function(wheel,speed,time){
      rem.moveWheelsByDegree(wheel,time,speed);
    };

    ext.movePanRobobo = function(degrees){
      rem.movePan(degrees,"10");
    };

    ext.moveTiltRobobo = function(degrees){
      rem.moveTilt(degrees,"10");
    };

    ext.changeEmotion = function(emotion){
      rem.changeEmotion(emotion);
    };

    ext.setLedColor = function(led,color){
      rem.setLedColor(led, color);
    };

    ext.changeLedStatus = function(led,status){
      rem.setLedColor(led,status);
    };

    ext.turnInPlace = function(degrees) {
      rem.turnInPlace(degrees);
    }


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'set Robobo IP %s and port %s','connectToRobobo','192.168.0.103','22226'],
          [' ', 'say %s','talkRobobo','hello world'],
          [' ', 'Move wheel %m.wheels by %s degrees at speed %s','moveRoboboDeg','both','180','50'],
          [' ', 'Move wheel %m.wheels at speed %s for %s milliseconds','moveRoboboTime','both','50','1000'],
          [' ', 'Move pan to %s','movePanRobobo','180'],
          [' ', 'Turn in place %s degrees','turnInPlace','360'],
          [' ', 'Move tilt %s','moveTiltRobobo','90'],
          [' ', 'set emotion %m.emotions','changeEmotion','normal'],
          [' ', 'set led %m.leds color to %m.colors','setLedColor','all','blue'],
          [' ', 'set led %m.leds status to %m.status','changeLedStatus','all', 'off'],
        ],
        menus: {
          motorDirection: ['forward', 'backward'],
          wheels: ['right', 'left','both'],
          emotions: ['happy','laughting','sad','angry','surprised','normal'],
          colors: ['white','red','blue','cyan','magenta','yellow','green','orange'],
          status: ['on','off'],
          leds: ['0','1','2','3','4','5','6','7','8','9','all'],
        },
    };


    // Register the extension
    ScratchExtensions.register('Robobo Extension', descriptor, ext);
})({});
