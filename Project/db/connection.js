const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'meds_dashboard',
  port : "3306"
});
 
connection.connect((error)=> {
    if (error) {
      console.error('error connecting');
      return;
    }
   
    console.log('CONNECT TO MYSQL');
  });
  module.exports= connection ;