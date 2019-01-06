var botui = new BotUI('bot');

var socket = io.connect('https://sanjbot.herokuapp.com:8010');

botui.message.add({
    content: 'Lets Start Talking...',
    delay: 1500,
}).then(function () {
    botui.action.text({
        action: {
            placeholder: 'Say Hello',
        }
    }).then(function (res) {
        socket.emit('fromClient', {
            client: res.value
        }); // sends the message typed to server
        console.log(res.value); // will print whatever was typed in the field.
    }).then(function () {
        socket.on('fromServer', function (data) { // recieving a reply from server.
            console.log(data.server);
            newMessage(data.server);
            addAction();
        })
    });
})

function newMessage(response) {
    botui.message.add({
        content: response,
        delay: 0,
    })
}

function addAction() {
    botui.action.text({
        action: {
            placeholder: 'enter response...',
        }
    }).then(function (res) {
        socket.emit('fromClient', {
            client: res.value
        });
        console.log('client response: ', res.value);
    })
}
