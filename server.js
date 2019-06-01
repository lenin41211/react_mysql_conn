const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

//const SELECT_ALL_USER_QUERY = 'SELECT * FROM forexsmple'



var con = mysql.createConnection(
"mysql://root:root@localhost:3308/testdb"
  );


app.use(cors())

app.use(express.static('routes'));


 var server = app.listen(process.env.PORT || 5000, listen);
 var values = {};
 function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

var io = require('socket.io')(server)

 con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      });

function randomm(){

      let b_price = Math.floor(Math.random().toFixed(5)*100000) 
      let s_price = Math.floor(Math.random().toFixed(5)*100000) 
      let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

      values = { b_price : b_price,s_price : s_price,date : date }
      //console.log(values);
      //io.emit('receive', 'data received')

     

      
      var sql = "insert into forexsample (b_price, s_price,date) values ("+b_price+","+s_price+",'"+ date +"') "
      con.query(sql,  function (err, result) {
      if (err) throw err;
      console.log(values);
      io.emit('receive', values)
      //console.log("Result: " + result);
      });
      
    
}




io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
    
    setInterval(function(){randomm()}, 5000);
    //randomm();

     socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);