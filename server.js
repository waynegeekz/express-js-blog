const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require ('./routes/articles');
const app = express();

mongoose.connect('mongodb://localhost/blog',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');


app.use(express.urlencoded( { extended: false }));

/* ROUTE TO HOMEPAGE */
app.get('/', async (req, res) => { 
    const articles = await Article.find().sort({
        created: 'desc'
    });
    res.render('index');
});

app.use('/articles', articleRouter);

app.listen(5000);