'use strict';

const PORT = 8000;

var http = require("http");

var util = require("./utils");
var md5 = require("md5");
var moment = require("moment");

//you create a server as follows, by sending a request handler function:
var server = http.createServer(function(req, res) {
    console.log("request:", req);
    console.log("request.method:", req.method);

//Prevent cross issues issues:
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Request-Method", '*');
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");


    var userAgent = req.headers['user-agent'];

    var requestUrl = req.url;

    if (requestUrl.match("square")) {

        var nums = decodeURI(requestUrl);
        nums = nums.split("/");
        nums = nums.slice(2);

        if(nums.length>1){
          res.write("Error, more than one number!");
        }
        else{
          res.write(Math.pow(parseFloat(nums[0]),2).toString());
        }

    } else if (requestUrl.match("sum")) {

      var nums = decodeURI(requestUrl);
        nums = nums.split("/");
        nums = nums.slice(2);

        var retVal = nums.reduce(function(a, b) {
            return parseFloat(decodeURI(a)) + parseFloat(decodeURI(b));
        });

        res.write(retVal.toString());


    } else if (requestUrl.match("multiply")) {

      var nums = decodeURI(requestUrl);
        nums = nums.split("/");
        nums = nums.slice(2);

        var retVal = nums.reduce(function(a, b) {
            return parseFloat(decodeURI(a)) * parseFloat(decodeURI(b));
        });

        res.write(retVal.toString());
        

    } else if (requestUrl.match("sentence")) {

        var conSentence = requestUrl.split("/");
        conSentence = conSentence.slice(2).toString();
        conSentence = decodeURI(conSentence);
        res.write(JSON.stringify(util.sentenceAnalyzer(conSentence)));

    } else if (requestUrl.match("gravatar")) {

        var conSentence = requestUrl.split("/");
        conSentence = conSentence.slice(2).toString();
        conSentence = decodeURI(conSentence);
        res.write(md5(conSentence));

    } else if (requestUrl.match("birthday")) {

        var retObj = {};
        var conSentence = requestUrl.split("/");
        conSentence = conSentence.slice(2).toString();
        conSentence = decodeURI(conSentence);
        var dOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        if (moment(conSentence, "YYYY-MM-DD").isValid()) {

            var bDay = moment(conSentence, "YYYY-MM-DD");
            retObj.age = bDay.fromNow("true");
            retObj.date = bDay.format("dddd, MMMM Do YYYY");
        }
        res.write(JSON.stringify(retObj));
    }

    res.end(); //closes the response
});

server.listen(PORT, function(err) {
    console.log(`server listening on ${PORT}`);
}); 