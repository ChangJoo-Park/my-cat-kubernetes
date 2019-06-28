const express = require('express')
const mongoose = require('mongoose')
const catNames = require('cat-names');

const MONGO_HOST = process.env.NODE_ENV === 'production' ? 'mongo' : 'localhost'
mongoose.connect(`mongodb://${MONGO_HOST}:27017/cats`, {useNewUrlParser: true});
const Cat = mongoose.model('Cat', { name: String });

const app = express()

app.get('/', function(req, res) {
    return Cat.find().then(result => {
        return res.status(200).json(result)
    })
});

app.get('/cat', function (req, res) {
    const kitty = new Cat({ name: catNames.random() });
    kitty.save().then(() => {
        return res.status(201).json(kitty)
    });
})

app.listen(3000, function () {
    console.log('hello world');
})
