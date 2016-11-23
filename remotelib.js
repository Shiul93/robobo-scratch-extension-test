
//Constructor of the remote control object
function Remote(ip){
  this.ip = ip;
  this.port = 40404;
  this.ws = undefined;
  this.commandid = 0;
  this.statusmap = new Map();
  this.callbackmap = new Map();
//END OF REMOTE OBJECT
};

Remote.prototype = {


  registerCallback: function (name,callback) {
    this.callbackmap.set(name,callback);
    //END OF REGISTERCALLBACK FUNCTION
  },
  connect :function() {
    this.ws = new WebSocket("ws://"+this.ip+":"+this.port);

    this.ws.onopen = function() {
      console.log("Connection Stablished");

    }

    this.ws.addEventListener('message', function(evt) {
      var received_msg = evt.data;
      this.handleMessage(received_msg);

    }.bind(this));

    this.ws.onclose = function() {
      console.log("Connection Closed");
    }

    //END OF CONNECT FUNCTION
  },

  sendMessage: function(message) {
    this.commandid = this.commandid +1;
    this.ws.send(message);

    //END OF SENDMESSAGE FUNCTION
  },

  handleMessage: function(message) {

    var jsonmsg = JSON.parse(message)
    console.log(typeof(jsonmsg.name) == 'string');
    if (typeof(jsonmsg.name) == 'string'){
      this.manageStatus(jsonmsg);
    }else if (typeof(jsonmsg.commandid) != "undefined") {
      this.manageResponse(jsonmsg);
    }

    //END OF HANDLEMESSAGE FUNCTION
  },


  //MOVEMENT

  moveWheelsByDegree: function(wheel,degrees,speed) {
    var message = JSON.stringify({
        "name": "MOVEBYDEGREES",
        "parameters": {
            wheel: wheel,
            degrees: degrees,
            speed:speed
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVEDEGREE FUNCTION
  },

  moveWheelsByTime: function(wheel,time,speed) {
    var message = JSON.stringify({
        "name": "MOVEBYTIME",
        "parameters": {
            wheel: wheel,
            time: time,
            speed:speed
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVETIME FUNCTION
  },

  moveWheelsSeparated: function(lSpeed,rSpeed,time) {
    var message = JSON.stringify({
        "name": "MOVETWOWHEELS",
        "parameters": {
            lspeed: lSpeed,
            rspeed: rSpeed,
            time:time
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVETWOWHEELS FUNCTION
  },

  turnInPlace: function(degrees) {
    var message = JSON.stringify({
        "name": "TURNINPLACE",
        "parameters": {
            degrees: degrees
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF TURNINPLACE FUNCTION
  },

  movePan: function(pos, vel) {
    var message = JSON.stringify({
        "name": "MOVEPAN",
        "parameters": {
            pos: pos,
            speed:vel
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVEPAN FUNCTION
  },

  moveTilt: function (pos, vel) {
    var message = JSON.stringify({
        "name": "MOVETILT",
        "parameters": {
            pos: pos,
            speed:vel
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF MOVETILT FUNCTION
  },

  //ENDMOVEMENT

  //HRI
  talk : function (speech) {
    var message = JSON.stringify({
        "name": "TALK",
        "parameters": {
            text: speech
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF TALK FUNCTION
  },

  changeEmotion : function (emotion) {
    var message = JSON.stringify({
        "name": "CHANGEEMOTION",
        "parameters": {
            emotion: emotion
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF CHANGEEMOTION FUNCTION
  },

  setLedColor: function (led,color) {
    var message = JSON.stringify({
        "name": "LEDCOLOR",
        "parameters": {
            led:led,
            color:color
        },
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF CHANGECOLOR FUNCTION
  },

  //ENDHRI

  //SENSING
  getLightBrightness: function () {
    var message = JSON.stringify({
        "name": "GETBRIGHTNESS",
        "parameters": {},
        "id": this.commandid
    });
    this.sendMessage(message)
    //END OF GETLIGHTBRIGHTNESS FUNCTION
  },

  brightnessChanged: function (callback) {
    callback();

    //END OF BRIGHTNESSCHANGED FUNCTION
  },

  consultIR: function (irnumber) {
    console.log("ASDF");
    console.log(this.statusmap.get("IRSensorStatus"+irnumber).value);
    return this.statusmap.get("IRSensorStatus"+irnumber).value;
    //END OF GETLIGHTBRIGHTNESS FUNCTION
  },

  //ENDSENSING

  //VISION

  colorDetected : function (callback) {
    callback();
  },

  getColor : function () {
    return this.statusmap.get("color");
    //END OF GETCOLOR FUNCTION
  },

  //ENDVISION


  manageStatus : function (msg) {


    console.log(msg.name);

    if (msg.name == "TapNumber"){
      console.log(msg.value);
    }
    if (msg.name == "NEWCOLOR"){
      (this.callbackmap.get("onNewColor"))();
      console.log(msg.value);
    }

    if (msg.name == "IRSTATUS"){

      for (var key in msg.value) {
        //console.log(key);


          this.statusmap.set(key,msg.value[key]);
          console.log(this.statusmap);

        //  console.log(msg.value[key]);

      }
    }
    //END MANAGESTATUS FUNCTION
  },

  manageResponse : function (msg) {
      console.log(JSON.stringify(msg));

    //END MANAGERESPONSE FUNCTION
  }

}
