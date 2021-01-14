const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSanitizer = require("express-sanitizer");
const mongoose = require('mongoose');

mongoose.connect('mongodb://10.0.14.27/vpctraining', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

// models
const dripac = new mongoose.Schema({
    name: String,
    phone: String,
    created: {type: Date, default: Date.now}
});

const Dripac = mongoose.model("Dripac", dripac);

// routes
app.get('/', function (req, res){
    Dripac.find(function (err, found){
        if (err){
            res.send('Nesto ne ljava');
        } else {
            console.log(found);
            res.render('index', {dripci: found});
        }
    })
});

app.get('/join', function (req, res){
    res.render("join");
});

app.post('/new', function(req, res){
    let noviDripac = {
        name: req.body.dripac.name,
        phone: req.body.dripac.phone,
        created: Date.now()
    }
    Dripac.create(noviDripac, function (err, novi){
        if (err){
            console.log(err);
        } else {
            console.log(novi);
            res.redirect('/');
        }
    })
})

app.listen(3200, function (){
    console.log('VPC on 3200');
})
