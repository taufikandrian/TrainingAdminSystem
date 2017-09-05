const express = require('express');
const router  = express.Router();
const fs      = require('fs');

// var user  = require("../models/user");
// var grade = require("../models/grade");

/* GET api listing. */
// API for TAS
// router.get('/grades', function(req, res) {
// 	grade.getRecords(function(status, data){
// 		if(status > 0) {
// 			res.writeHead(200, {"Content-Type": "text/json"});
// 			res.end(JSON.stringify(data));
// 		}
// 		else {console.log(data);}
// 	}, '');
// });

// router.get('/users', function(req, res) {
// 	user.getRecords(function(status, data){
// 		if(status > 0) {
// 			res.writeHead(200, {"Content-Type": "text/json"});
// 			res.end(JSON.stringify(data));
// 		}
// 		else {console.log(data);}
// 	}, '');
// });

router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/auth', function(req, res) {
  fs.readFile('data/users.json', 'utf8', function (err, data) {
    if (err) throw err;

    data = JSON.parse(data);
    user = data.filter(function(item) {
      return item.user_username == req.body.username;
    });

    if(user.length > 0 && user[0].user_password == req.body.password) {
      res.json({
        "status"  : 'success',
        "code"    : 200,
        "data"    : {
          "user"  : user[0],
        }
      });
    } else {
      res.json({
        "status"  : 'failed',
        "code"    : 400,
        "data"    : {
          "user"  : {
            "username"  : req.body.username,
            "password"  : req.body.password,
          },
          "message" : "Username and password does not match in our database"
        }
      });
    }
  });
});

module.exports = router;
