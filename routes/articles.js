const express = require('express');
const router = express.Router();
const Article = require('./../models/articles');

router.get('/', async(req, res) => {
    const articles = await Article.find().sort({
        created: 'desc'
    });
    res.render("articles/index", { 'articles' : articles });
});

router.get('/add', (req, res) => {
    res.render('articles/add', { 'article': new Article() });
});

router.get('/view/:slug', async(req, res) => {
    const article = await Article.findOne({slug: req.params.slug});

    if(article === null) {
        res.redirect('/article');
    }

    res.render('articles/view', {'article': article })

});

router.post('/', async (req, res) => {
    let article = new Article({
        title : req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    try {
        article = await article.save();
        res.redirect(`/articles/view/${article.slug}`)
    } catch (e) {
        console.log(e);
        res.render('articles/add', { 'article': article });
    }

});

router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/articles');
    } catch (e) {
        console.log(e);
        res.send('Failed to Delete');
    }

});

module.exports = router;