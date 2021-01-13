const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res){
    res.send('Tu smo!');
});

app.listen(3200, function (){
    console.log('VPC on 3200');
})
