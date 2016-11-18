(function(ext) {
    // Cleanup function when the extension is unloaded
    var ws;
    var commandid = 0;

    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    //Connection Block
    ext.connectToRobobo = function(ip,port) {
        ws =new WebSocket("ws://"+ip+":"+port);

        ws.onopen = function() {};

        ws.onmessage = function(evt) {var received_msg = evt.data;
        console.log(evt.data)
      };

        ws.onclose = function() {}
    };

    ext.talkRobobo = function(text){
        var message = JSON.stringify({
            "name": "TALK",
            "parameters": {
                value: text
            },
            "id": commandid
        });

        commandid = commandid+1;
        ws.send(message);
    };
    ext.moveRobobo = function(wheel,degrees,speed){
      var message = JSON.stringify({
          "name": "MOVEBYDEGREES",
          "parameters": {
              wheel: wheel,
              degrees: degrees,
              speed:speed,
          },
          "id": commandid
      });

      commandid = commandid+1;
      ws.send(message);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'set Robobo IP %s and port %s',                    'connectToRobobo'],
          [' ', 'say %s',                    'talkRobobo'],
          [' ', 'Move wheel %m.wheels by %i degrees at speed %i',                    'talkRobobo'],
        ],
        menus: {
        motorDirection: ['forward', 'backward'],
        wheels: ['right', 'left'],
    },
    };


    // Register the extension
    ScratchExtensions.register('Robobo Extension', descriptor, ext);
})({});
