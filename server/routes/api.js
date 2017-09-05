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
      return item.username == req.body.username;
    });

    if(user.length > 0 && user[0].password == req.body.password) {
      res.json({
        "status" : 'success',
        "user": {
          'username' : user[0].username,
          'email' : user[0].email,
        }
      });
    } else {
      res.json({
        "status" : 'failed',
        "message": "Username or password is not match."
      });
    }
  });
});

module.exports = router;
