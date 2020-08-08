const express = require('express');
const articleRouter = require ('./routes/articles')
const app = express();

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const articles = [
        {
            title : "Test Article",
            created: new Date(),
            description: "This excerpt will explain the details of the website."
        },
        {
            title : "Second Article",
            created: new Date(),
            description: "This excerpt will explain the details of the website."
        }
    ];
    res.render('index', { articles: articles});
});


app.listen(5000);