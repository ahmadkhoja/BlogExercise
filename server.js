const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))

var db

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


MongoClient.connect('mongodb://user1:user1@ds111410.mlab.com:11410/exercisedatabase', (err, database) => {
    if (err) {
        return err
    }
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.get('/', (req, res) =>{
    db.collection('posts').find().toArray(function(err, results) {
        res.render('index.ejs', {
            posts: results
        })  
    })
})

app.post('/add', (req, res) => {
    db.collection('posts').save(req.body, (err, result) => {
        if (err) 
            return console.log(err)
        res.redirect('/')
    })
})

