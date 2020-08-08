const express = require('express');
const router = express.Router();


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
    res.render('articles/add');
});

router.post('/', (req, res) => {

});

module.exports = router;