var pg = require('pg');
var conString = "postgres://mike:password@192.168.136.1:5432/test";

var client = new pg.Client(conString);
client.connect();

//queries are queued and executed one after another once the connection becomes available
var x = 10;

client.query("truncate table junk;");

while(x>0)
{
client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
client.query("INSERT INTO junk(name, a_number) values($1, $2)", ['John', x]);
x = x - 1;
}

var query = client.query("SELECT * FROM junk");
//fired after last row is emitted

query.on('row', function(row) {
  console.log(row);
});

query.on('end', function() { 
  client.end();
});



//queries can be executed either via text/parameter values passed as individual arguments
//or by passing an options object containing text, (optional) parameter values, and (optional) query name
//client.query({
//  name: 'insert beatle',
//  text: "INSERT INTO beatles(name, height, birthday) values($1, $2, $3)",
//  values: ['George', 70, new Date(1946, 02, 14)]
//});
