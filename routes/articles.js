const express = require('express')
const router = express.Router()
const Article = require('./../models/articles')

router.get('/', async(req, res) => {
    const articles = await Article.find().sort({
        created: 'desc'
    })
    res.render("articles/index", { 'articles' : articles })
})

router.get('/add', (req, res) => {
    res.render('articles/add', { 'article': new Article() })
})

router.get('/view/:slug', async(req, res) => {
    const article = await Article.findOne({slug: req.params.slug})

    if(article === null) {
        res.redirect('/article')
    }

    res.render('articles/view', {'article': article })

})

router.get('/edit/:id', async(req, res) => {

    const article = await Article.findById(req.params.id);

    res.render('articles/edit', {'article': article})
    
})

router.post('/', async (req, res, next) => {
    
    req.article = new Article();

    next()

}, saveArticleAndRedirect('add'))


router.put('/:id', async (req, res, next) => {
    
    req.article = await Article.findById(req.params.id);

    next()

}, saveArticleAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.redirect('/articles')
    } catch (e) {
        console.log(e)
        res.send('Failed to Delete')
    }

})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
         
        try {
            article = await article.save()
            res.redirect(`/articles/view/${article.slug}`)
        } catch (e) {
            console.log(e)
            res.render(`articles/${path}`, { 'article': article })
        }
    }
}
module.exports = router