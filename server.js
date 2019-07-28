const express = require('express');
const bodyParser = require('body-parser');
// create express server
const app = express();

//parser request of content-type - application/json
app.use(bodyParser.json());
// parser requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//define a simple route
app.get('/',(req,res)=>{
    res.json({"message":"welcome to myjson application"});
});

require('./app/routes/json.routes.js')(app);

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});
