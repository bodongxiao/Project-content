var express = require('express');
var app = express();

var http = require('http');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'tutor_database',
    port:'3306'
});

var querystring = require('querystring');
var alldata = '';
var datastring = alldata.toString();
var obj = querystring.parse(datastring);


var server = http.createServer(function(req,res){
    let alldata = '';
    req.on('data',function(chunk){
        alldata+=chunk;
    })
    req.on('end',function(){
        let datastring = alldata.toString();
        let obj = querystring.parse(datastring);
        console.log(obj.user);
        console.log(obj.pw);



        res.end();
        
        // connection.connect();

        var addsql = 'INSERT INTO login(user,password) VALUES(?,?)';
        var addsqlParams = [obj.user,obj.pw];
    
        connection.query(addsql,addsqlParams,function (err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
           }        
         
          console.log('INSERT ID:',result);   
        //   connection.end();     
  
        });
        



    })
})

        // connection.connect();

        // var addsql = 'INSERT INTO login(user,password) VALUES(?,?)';
        // var addsqlParams = [obj.user,obj.pw];
    
        // connection.query(addsql,addsqlParams,function (err,result){
        // if(err){
        //     console.log('[INSERT ERROR] - ',err.message);
        //     return;
        //    }        
         
        //   console.log('INSERT ID:',result);   
        //   connection.end();     
  
        // });

// app.get('/',function(req,res){
//     res.send('new home page!');
// });


console.log('listening 3000')
// app.listen(3000);
server.listen(3000);