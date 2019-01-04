var botui = new BotUI('bot');

function init() {

    var protocol;
    $.getJSON("phq.json", function (data) {
        protocol = data;
    });

    botui.message.bot({
        delay: 700,
        content: 'Welcome to SanjBot. The current survey protcol is modeled after the PHQ-9'
    }).then(function () {
        survey(protocol, 0);
    });
}

function parseObj(obj) {
    var question = Object.keys(obj)[0];
    var options = obj[question];

    var formatted_opt = [];
    for (var j = 0; j < options.length; j++) {
        var cell = {};
        cell.text = options[j];
        cell.value = options[j];
        formatted_opt.push(cell);
    }
    return {
        "question": question,
        "options": formatted_opt
    };
}

function survey(protocol, i) {
    if (i >= Object.keys(protocol).length) {
        done();
        return;
    }

    var curr = parseObj(protocol[i]);

    botui.message.bot({
            delay: 500,
            content: curr.question
        })
        .then(function () {
            return botui.action.button({
                delay: 1000,
                action: curr.options
            })
        })
        //        .then(function (res) {
        //            return botui.message.bot({
        //                delay: 1500,
        //                loading: true, // pretend like we are doing something
        //                content: 'You selected: ' + res.value
        //            });
        //        })
        .then(function () {
            survey(protocol, i + 1);
        });
}

//function getProtocol(filepath) {
//    $.getJSON("protocol.json", function (data) {
//        var obj = JSON.parse(data);
//        var obj_str = JSON.stringify(obj, null, 2);
//
//        console.log(obj_str);
//
//    });
//}


function done() {

    botui.message.bot({
        delay: 700,
        content: 'Your response has been recorded'
    }).then(function () {
        return botui.message.bot({
            delay: 700,
            content: "Thank you"
        })
    });
}



init();
