const express = require('express');
const router = express.Router();
const Article = require('./../models/articles');


router.get('/', (req, res) => {
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
    res.render("articles/index", { 'articles' : articles });
});

router.get('/add', (req, res) => {
    res.render('articles/add', { 'article': new Article() });
});

router.get('/view/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/', async (req, res) => {
    let article = new Article({
        title : req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        article = await article.save();
        res.redirect(`/articles/view/${article.id}`)
    } catch (e) {
        res.render('articles/add', { 'article': article });
    }

});

module.exports = router;