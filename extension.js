(function(ext) {
    // Cleanup function when the extension is unloaded
    var ws;

    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    //Connection Block
    ext.connectToRobobo = function(ip) {
        ws =new WebSocket("ws://"+ip+":22226");

        ws.onopen = function() {};

        ws.onmessage = function(evt) {var received_msg = evt.data;
        console.log(evt.data)
      };

        ws.onclose = function() {}
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'set ROBOBO IP %s',                    'connectToRobobo'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});
