var express = require('express');
var router = express.Router();

var request = require('request');

var username = 'class';
var password = 'secret12!@';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});




router.get('/send/kkoft', function(req, res, next) {

  console.log(req.query);

  msgId = "L.elebot";
  msgBody="도착메세지"
  var json = {};
  json.msg_id = msgId;
  json.send_time = "";

  json.dest_phone = "01056863434";
  json.send_phone = "01056863434";
  json.sender_key = "d6b73318d4927aa80df1022e07fecf06c55b44bf";
  json.msg_body = "L.lebot이 도착했어요 문을 열어주세요:)";


  json.image = {
    "img_url": "http://mud-kage.kakao.com/dn/bjlFTg/btqjH8lbTD5/YlC7bO5KU0SNyBdUN57eGK/img_l.jpg",
    "img_link": "http://www.lotte.com"
  };

  json.ad_flag = "N";

  var requestOptions = {

    url: "http://210.93.181.229:9090/v1/send/kakao-friend",
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Authorization": auth
    },
    json: json
  };

  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {

      res.status(200).json({
        "code": body.code,
        "msg": body.msg
      });
    }
  }

  request(requestOptions, callback);
});



module.exports = router;
