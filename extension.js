(function(ext) {
    // Cleanup function when the extension is unloaded
    var rem;
    var commandid = 0;
    var newcolor = false;

    $.getScript("https://shiul93.github.io/robobo-scratch-extension-test/remotelib.js", function(){

   Console.log("Script loaded");

    });

    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    ext.onNewColor = function () {
      newcolor = true;
    }
    //Connection Block
    ext.connectToRobobo = function(ip) {
        rem = new Remote(ip);
        rem.connect(ip);
        rem.registerCallback("onNewColor",ext.onNewColor);

    };

    ext.talkRobobo = function(text){

        rem.talk(text);
    };
    ext.moveRobobo = function(wheel,quantity,mtype,speed){
      if (mtype='degrees'){
        rem.moveWheelsByDegree(wheel,quantity,speed);
      }else {
        rem.moveWheelsByTime(wheel,quantity,speed);
      }

    };

    ext.moveRoboboWheels = function(lSpeed,rSpeed,time){
      rem.moveWheelsSeparated(lSpeed,rSpeed,time);
    };

    ext.movePanRobobo = function(degrees, speed){
      rem.movePan(degrees,speed);
    };

    ext.moveTiltRobobo = function(degrees,speed){
      rem.moveTilt(degrees,speed);
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
    ext.readIr = function(ir) {
      return rem.turnInPlace(ir);
    }
    ext.readCol = function() {
      if (newcolor){
        newcolor = false;
        return true;
      }else {
        return false;
      }
    }


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'set Robobo IP %s','connectToRobobo','192.168.0.103'],
          [' ', 'say %s','talkRobobo','hello world'],
          [' ', 'Move wheel %m.wheels by %s %m.mtype at speed %s','moveRobobo','both','1','seconds','50'],
          [' ', 'Move wheel left at speed %s and wheel right at speed %s for %s seconds','moveRoboboWheels','50','50','1000'],
          [' ', 'Move pan to %s at speed %s','movePanRobobo','180','5'],
          [' ', 'Turn in place %s degrees','turnInPlace','360'],
          [' ', 'Move tilt %s at speed %s','moveTiltRobobo','90','5'],
          [' ', 'Change emotion to %m.emotions','changeEmotion','normal'],
          [' ', 'set led %m.leds color to %m.colors','setLedColor','all','blue'],
          [' ', 'set led %m.leds %m.status','changeLedStatus','all', 'off'],
          ['r', 'Read IR %m.ir','readIr','0'],
          ['r', 'Read color detected','readCol'],
          ['h', 'when color is detected','readCol'],

        ],
        menus: {
          motorDirection: ['forward', 'backward'],
          wheels: ['right', 'left','both'],
          mtype: ['seconds','degrees'],
          emotions: ['happy','laughting','sad','angry','surprised','normal'],
          colors: ['white','red','blue','cyan','magenta','yellow','green','orange'],
          status: ['on','off'],
          leds: ['0','1','2','3','4','5','6','7','8','9','all'],
          ir: ['0','1','2','3','4','5','6','7','8','9'],
        },
    };


    // Register the extension
    ScratchExtensions.register('Robobo Extension', descriptor, ext);
})({});
