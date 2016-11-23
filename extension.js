(function(ext) {
    // Cleanup function when the extension is unloaded
    var rem;
    var commandid = 0;
    var newcolor = false;
    var lastIrChange = "";

    $.getScript("https://shiul93.github.io/robobo-scratch-extension-test/remotelib.js", function(){



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

    ext.onIrChanged = function (ir) {
      lastIrChange = ir;
    }
    //Connection Block
    ext.connectToRobobo = function(ip) {
        rem = new Remote(ip);
        rem.connect(ip);
        rem.registerCallback("onNewColor",ext.onNewColor);
        rem.registerCallback("onIrChanged",ext.onIrChanged);

    };

    ext.talkRobobo = function(text){

        rem.talk(text);
    };
    ext.moveRobobo = function(wheel,quantity,mtype,speed){
      if (mtype=='degrees'){
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
    };
    ext.readIrValue = function(ir) {
      console.log("ESTOY AQUI");
      var value = 0
      value = rem.consultIr();
      return value;
    };
    ext.newCol = function() {
      if (newcolor){
        newcolor = false;
        return true;
      }else {
        return false;
      }
    };

    ext.readCol = function() {
      return rem.getColor();
    };
    ext.changedIr = function(irname) {
      if (lastIrChange == irname){
        return true;
      }else {
        lastIrChange = "";
        return false;
      }
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'connect ROBOBO at %s','connectToRobobo','192.168.0.110'],
          [' ', 'say %s','talkRobobo','hello world'],
          [' ', 'move wheel %m.wheels by %s %m.mtype at speed %s','moveRobobo','both','1','seconds','50'],
          [' ', 'move wheel left at speed %s and wheel right at speed %s for %s seconds','moveRoboboWheels','50','50','1000'],
          [' ', 'move pan to %s at speed %s','movePanRobobo','180','5'],
          [' ', 'move tilt to %s at speed %s','moveTiltRobobo','90','5'],
          [' ', 'change emotion to %m.emotions','changeEmotion','normal'],
          [' ', 'set led %m.leds color to %m.colors','setLedColor','all','blue'],
          [' ', 'set led %m.leds %m.status','changeLedStatus','all', 'off'],
          ['r', 'read IR %m.ir','readIrValue','1'],
          ['r', 'read color detected','readCol'],
          ['h', 'when color is detected','newCol'],
          ['h', 'when ir %m.ir changed','changedIr'],

        ],
        menus: {
          motorDirection: ['forward', 'backward'],
          wheels: ['right', 'left','both'],
          mtype: ['seconds','degrees'],
          emotions: ['happy','laughting','sad','angry','surprised','normal'],
          colors: ['white','red','blue','cyan','magenta','yellow','green','orange'],
          status: ['on','off'],
          leds: ['0','1','2','3','4','5','6','7','8','9','all'],
          ir: ['1','2','3','4','5','6','7','8','9'],
        },
    };


    // Register the extension
    ScratchExtensions.register('Robobo Extension', descriptor, ext);
})({});
