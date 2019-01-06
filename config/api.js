var apiai = require('apiai');

//Enter your API Key
var app = apiai('a173a9e0c3bd4fd283b6bc0dcae78cf1');

// Function which returns speech from api.ai
var getRes = function (query) {
    var request = app.textRequest(query, {
        sessionId: '<unique session id>'
    });
    const responseFromAPI = new Promise(
        function (resolve, reject) {
            request.on('error', function (error) {
                reject(error);
            });
            request.on('response', function (response) {
                resolve(response.result.fulfillment.speech);
            });
        });
    request.end();
    return responseFromAPI;
};

// test the command :
getRes('hello').then(function (res) {
    console.log(res)
});

module.exports = {
    getRes
}
