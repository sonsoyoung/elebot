// a simple node app for kakao api
/*var express = require('express');
var app = express();
var bodyParser = require('body-parser');*/

'use strict'

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var util = require('util')
var methodOverride = require('method-override')
var http = require('http')
var process = require('process')
var socket = require('net')
var moment = require('moment')
var config = require('./config')

global.app = new express()
app.set('port', process.env.PORT || config.serverConfig.httpPort)
app.use(compression())
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(logger('dev'))

http.createServer(app).listen(app.get('port'), () => {
    console.log(util.format('# [HTTP Server running at %d] [pid:%d] [%s]', config.serverConfig.httpPort, process.pid, moment().format('YYYY-MM-DD HH:mm:ss')));
});
//
// app.get('/get', (req, res) => {
//
//     var client = new socket.Socket()
//     client.connect(config.clientConfig.serverPort, config.clientConfig.serverHost, () => {
//         client.write(req.query.param)
//     })
//     res.status(200).send(util.format('[Get Response] [%s] Hello World', moment().format('YYYY-MM-DD HH:mm:ss')))
// })
//
// app.post('/post', (req, res) => {
//
//     var client = new socket.Socket()
//     client.connect(config.clientConfig.serverPort, config.clientConfig.serverHost, () => {
//         client.write(req.query.param)
//     })
//     res.status(200).send(util.format('[Post Response] [%s] Hello World', moment().format('YYYY-MM-DD HH:mm:ss')))
// })


var log_temp = ""
var room_num = ""
var Redis = require('ioredis');
var redis = new Redis();

app.use(bodyParser.json());

app.get('/keyboard', function(req, res) { // setting keyboard for first open
  let keyboard = {
    "type": "text"
  };
  res.send(keyboard);
});

app.post('/message', function(req, res) {
  let user_key = decodeURIComponent(req.body.user_key); // user's key
  let type = decodeURIComponent(req.body.type); // message type
  let content = decodeURIComponent(req.body.content); // user's message
  console.log(user_key);
  console.log(type);
  console.log(content);

  let room_flag = content.indexOf('호');
  let num_flag = content.indexOf('개');

  var dataSend

  if (content == "다시") {
    dataSend = {
      "message": {
        "text": "방 호수를 입력해주세요😉"
      }
    }
  } else if (room_flag != -1) {
    dataSend = {
      "message": {
        "text": "안녕하세요." + content + "고객님😊"
      },
      "keyboard": {
        "type": "buttons",
        "buttons": [
          "Amenity Service",
          "주변관광지",
          "편의시설 안내",
          "모닝콜서비스",
          "콜택시",
        ]
      }
    }
    room_num = content;
  } else if (content == 'Amenity Service') {
    dataSend = {
      "message": {
        "text": "Amenity Service를 선택하셨습니다. 원하시는 서비스를 선택하세요😉"
      },
      "keyboard": {
        "type": "buttons",
        "buttons": [
          "수건",
          "가운",
          "샴푸",
        ]
      }
    }
  } else if (content == '수건') {
    dataSend = {
      "message": {
        "text": "필요하신 수건의 수량을 입력하세요🤗 (ex.3개)"
      }
    }
    log_temp = "수건"
  } else if (content == '가운') {
    dataSend = {
      "message": {
        "text": "필요하신 가운의 수량을 입력하세요🤗 (ex.3개)"
      }
    }
    log_temp = "가운"
  } else if (content == '샴푸') {
    dataSend = {
      "message": {
        "text": "필요하신 샴푸의 수량을 입력하세요🤗 (ex.3개)"
      }
    }
    log_temp = "샴푸"
  } else if ((log_temp == "수건" || log_temp == "샴푸" || log_temp == "가운") && num_flag != -1) {



    var send_message = '';
    if(room_num =="201호"){
      send_message = '01';
    }else if(room_num =="202호"){
      send_message = '02';
    }else{
      send_message = '03';
    }

    var client = new socket.Socket()
    client.connect(config.clientConfig.serverPort, config.clientConfig.serverHost, () => {
        client.write(send_message)
    })

    dataSend = {
      "message": {
        "text": log_temp + " " + content + "를 일레봇이 배달해드릴꺼예요😍",
        "keyboard": {
          "type": "buttons",
          "buttons": [
            "Amenity Service",
            "주변관광지",
            "편의시설 안내",
            "모닝콜서비스",
            "콜택시",
          ]
        },
        "photo": {
          "url": "https://user-images.githubusercontent.com/18205806/35784336-9d5ef67e-0a59-11e8-8123-1fde5af7be85.png",
          "width": 600,
          "height": 580
        }
      }
    }
    var kind = "";
    if (log_temp== "수건"){
      kind = "t";
    }else if (log_temp== "가운"){
      kind = "r";
    }else if (log_temp== "샴푸"){
      kind = "s";
    }
  redis.sadd('amenity_log2', [room_num, kind, content]);

    log_temp = ""
  } else if (content == '주변관광지') { // 1. 경복궁 2. 청계천 3. 문화역서울
    dataSend = {
      "message": {
        "text": "서울롯데호텔 주변 관광지 안내입니다. 원하는 관광지를 선택하세요😉"
      },
      "keyboard": {
        "type": "buttons",
        "buttons": [
          "경복궁",
          "청계천",
          "문화역서울",
        ]
      }
    }
  } else if (content == '경복궁') { // 1. 경복궁 2. 청계천 3. 문화역서울
    dataSend = {
      "message": {
        "text": "조선의 법궁, 경복궁🎎",
        "photo": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ12jaNi46u5znVJmcpvNLLl4_3xCBJOYluZKAMC_t_0-LIB2c",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "찾아가는 길",
          "url": "https://map.naver.com/?edid=11571707&sText=66Gv642w7Zi47YWUIOyEnOyauA%3D%3D&elng=1eba7d44ce265846068a2ca2a64d8356&sdid=11583194&eslng=c5b65c97aa5bf27ad853c95fa5a0e805&dtPathType=2&menu=route&lng=36f465d5ab10700c8bc0146adcec028d&eelat=ffb3fd4b842bdfec5da62d3c1b3a62cb&mapMode=0&elat=a449a5da0a47bcb81a8cc00ce08a90aa&pathType=0&eText=6rK967O16raB&slng=10ae85cbcefdbcecf62123b2080eb17f&eelng=6e4e7572975432aabad71dd36b8c872e&eType=SITE&slat=3f991cc55b3d0beeeae142257104d409&sType=SITE&eslat=50dc37151190967a2e254f2a4f7784d1&lat=e09acec99675ef6a6ec1aadda8645670&dlevel=10&enc=b64"
        }
      }
    }
  } else if (content == '청계천') { // 1. 경복궁 2. 청계천 3. 문화역서울
    dataSend = {
      "message": {
        "text": "하루의 마무리는 청계천야경으로🌌",
        "photo": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6OvUdPJjLGDu1zAGYbvjaWtxHo1xVcB1UpfptpCPY-Z0eZEZB",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "찾아가는 길",
          "url": "https://map.naver.com/?sText=66Gv642w7Zi47YWUIOyEnOyauA%3D%3D&dtPathType=2&lng=c5091c2f0ea9b1eedb5a82e575787358&mapMode=0&eText=7LKt6rOE7LKc&eType=SITE&sType=SITE&lat=fc54784afdbaa971a5f119cb157ec5c8&dlevel=11&enc=b64&edid=13491093&elng=05571e48a58ee21d6230a3a3b408edec&sdid=11583194&eslng=c5b65c97aa5bf27ad853c95fa5a0e805&menu=route&elat=538b46d0ba96c303cac0e7ecef5234e6&pathType=0&slng=10ae85cbcefdbcecf62123b2080eb17f&slat=3f991cc55b3d0beeeae142257104d409&eslat=50dc37151190967a2e254f2a4f7784d1"
        }
      }
    }
  } else if (content == '문화역서울') {
    dataSend = {
      "message": {
        "text": "1925년부터 살아 숨쉬는, 문화역서울🚂",
        "photo": {
          "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFt9PLTXs3D-fa271M1VdQnWrM6PVRMPBk0TgCKFlT590mO_Cpw",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "찾아가는 길",
          "url": "https://map.naver.com/?sText=66Gv642w7Zi47YWUIOyEnOyauA%3D%3D&dtPathType=2&lng=83eaef2df07ca10271094b00316ecdd6&mapMode=0&eText=66y47ZmU7Jet7ISc7Jq4IDI4NA%3D%3D&eType=SITE&sType=SITE&lat=48831213fb9af847f6994de03e1b9c92&dlevel=11&enc=b64&edid=20757885&elng=c06e0cf7507d7f04f93ba380b71009a6&sdid=11583194&eslng=c5b65c97aa5bf27ad853c95fa5a0e805&menu=route&eelat=5a711e06486a4a9205f29a50e8605aea&elat=ebf88674060e62bb38ed2086b2cbcac5&pathType=0&slng=10ae85cbcefdbcecf62123b2080eb17f&eelng=47fe002036de2050b54a479e88f76ecc&slat=3f991cc55b3d0beeeae142257104d409&eslat=50dc37151190967a2e254f2a4f7784d1"
        }
      }
    }
  } else if (content == '편의시설 안내') { // 1. 경복궁 2. 청계천 3. 문화역서울
    dataSend = {
      "message": {
        "text": "서울롯데호텔 내 부대시설입니다. 편하게 이용하세요😉"
      },
      "keyboard": {
        "type": "buttons",
        "buttons": [
          "설화수 스파",
          "체련장",
          "수영장",
        ]
      }
    }
  } else if (content == '설화수 스파') {
    dataSend = {
      "message": {
        "text": "당신의 지친 온 몸을 녹여줄 설화수 스파💆🏻",
        "photo": {
          "url": "http://www.lottehotel.com/upload/imagePool/201402/FACILITY/20140415153915644_1.jpg",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "이용 안내",
          "url": "http://m.lottehotel.com/seoul/ko/facility/facility-view.asp?type=FS&seq=1"
        }
      }
    }
  } else if (content == '체련장') {
    dataSend = {
      "message": {
        "text": "당신의 활력있는 생활을 책임질 체련장🏃🏻",
        "photo": {
          "url": "http://www.lottehotel.com/upload/imagePool/201402/FACILITY/20140206105226608_1.jpg",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "이용 안내",
          "url": "http://m.lottehotel.com/seoul/ko/facility/facility-view.asp?type=FS&seq=2"
        }
      }
    }
  } else if (content == '수영장') {
    dataSend = {
      "message": {
        "text": "도심 속에서 여유와 활기를 느낄 수 있는 최적의 공간🏊🏻",
        "photo": {
          "url": "http://www.lottehotel.com/upload/imagePool/201402/FACILITY/20140206111358704_1.jpg",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "이용 안내",
          "url": "http://m.lottehotel.com/seoul/ko/facility/facility-view.asp?type=FS&seq=3"
        }
      }
    }
  } else if (content == '수영장') {
    dataSend = {
      "message": {
        "text": "도심 속에서 여유와 활기를 느낄 수 있는 최적의 공간🏊🏻",
        "photo": {
          "url": "http://www.lottehotel.com/upload/imagePool/201402/FACILITY/20140206111358704_1.jpg",
          "width": 640,
          "height": 480
        },
        "message_button": {
          "label": "이용 안내",
          "url": "http://m.lottehotel.com/seoul/ko/facility/facility-view.asp?type=FS&seq=3"
        }
      }
    }
  } else if (content == '모닝콜서비스') {
    dataSend = {
      "message": {
        "text": "모닝콜 서비스를 선택하셨습니다. 원하는 시간을 입력하세요(ex 1030 or 2130)"
      }
    }
    log_temp = "모닝콜"
  } else if (log_temp == "모닝콜") {
    dataSend = {
      "message": {
        "text": "입력하신 시간에 전화드리겠습니다⏰"
      }
    }
    log_temp = ""
  } else if (content == "콜택시") {
    dataSend = {
      "message": {
        "text": "콜택시 서비스를 선택하셨습니다. 지금 불러드릴까요? 아니면 예약 하시겠습니까?😯"
      },
      "keyboard": {
        "type": "buttons",
        "buttons": [
          "지금",
          "예약"
        ]
      }
    }
    log_temp = "콜택시"
  } else if (content == "지금") {
    dataSend = {
      "message": {
        "text": "콜택시가 접수되었습니다. 도착시, 알림드리겠습니다.🚕"
      }
    }
  } else if (content == "예약" && log_temp == "콜택시") {
    dataSend = {
      "message": {
        "text": "원하는 시간을 입력하세요(ex 1030 or 2130)"
      }
    }
    log_temp = "콜택시2"
  } else if (log_temp == "콜택시") {
    dataSend = {
      "message": {
        "text": "원하는 시간을 입력하세요(ex 1030 or 2130)"
      }
    }
    log_temp = "콜택시2"
  } else if (log_temp == "콜택시2") {
    dataSend = {
      "message": {
        "text": "입력하신 시간에 택시를 준비하겠습니다.🚕"
      }
    }
    log_temp = ""
  } else if (content == "도움말") {
    dataSend = {
      "message": {
        "text": "안녕하세요.저는 엘레봇이예요😊서울롯데호텔을 이용하시는 고객님들에게 편의를 드리고 있어요.🤗대표적으로 어메니티 서비스접수를 도와 객실로 엘레봇이 직접 배달하고 있어요😎더불어 주변관광지 안내🗺, 편의시설 안내💆, 모닝콜⏰, 콜택시🚕 등의 서비스를 제공하고 있어요.먼저 방 호수를 입력해주세요(ex.201호)"
      }
    }
  } else {
    dataSend = {
      "message": {
        "text": "무슨 말인지 모르겠어요. 아직 엘레봇은 학습이 필요해요:( ""도움말""을 입력하시면 사용법을 알려드릴게요😇"
      }
    }
  }

  res.send(dataSend);

});


module.exports = app;
