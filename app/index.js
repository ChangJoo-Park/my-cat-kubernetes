const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('express-flash')

const MONGO_HOST = process.env.NODE_ENV === 'production' ? 'mongo' : 'localhost'
mongoose.connect(`mongodb://${MONGO_HOST}:27017/cats`, {useNewUrlParser: true});
const Cat = mongoose.model('Cat', { name: String });

const app = express()
const sessionStore = new session.MemoryStore;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash())

const fetchNewCatURL = () => {
    const timestamp = (new Date()).getTime()
    return `https://cataas.com/cat?${timestamp}`
}

app.get('/', function(req, res) {
    req.flash('info', 'Welcome');
    return res.render('index', { cat: fetchNewCatURL(), expressFlash: req.flash('success') })
});

app.get('/favorites', function(req, res) {
    return Cat.find().then(result => res.render('index', { cats: result }))
});

app.post('/favorites', function (req, res) {
    req.flash('success', 'This is a flash message using the express-flash module.');
    return res.redirect('/')
})

app.listen(3000, function () {
    console.log('hello world');
})
