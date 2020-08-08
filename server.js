const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require ('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.urlencoded( { extended: false }));

/* ROUTE TO HOMEPAGE */
app.get('/', (req, res) => { 
    res.render('index');
});

app.use('/articles', articleRouter);

app.listen(5000);