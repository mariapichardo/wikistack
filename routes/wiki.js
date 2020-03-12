const router = require('express').Router();
// const { db } = require('./models');
const {addPage} = require('../views');
const { Page } = require("../models");
const {wikipage} = require('../views');

router.use('/views', addPage);
router.use('/models', Page);
router.use('/views', wikipage);

router.get("/",  (req, res, next) => {
    res.send("hello world ");
  })

  router.get("/add",  (req, res, next) => {
    res.send(addPage());
  })

  router.get('/:slug', async (req, res, next) => {
    // res.send(`hit dynamic route at ${req.params.slug}`);
    try {
        const actualPage = await Page.findOne(
            {
                where: {
                    slug: req.params.slug
                }
            }
        )

        console.log(actualPage)
        res.json(actualPage)
    }
    catch (error) {
        next(error)
    }
  });

router.post('/', async (req, res, next) => {
console.log('THIS IS THE BODY' , req.body);
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content,  
    slug: req.body.title.split(' ').join('_'),
    status: 'open'
  });
console.log('THIS IS THE PAGE ', page);
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

// app.get('/', async (req, res, next) => {
//     res.send('<h1>Hi! You Should Go to the Pokemon Page!</h1>')
// })

// app.get('/pokemon', async (req, res, next) => {
//     try {
//         const allPokemon = await Pokemon.findAll()
//         console.log(allPokemon)
//         res.send(allPokemon)
//     }
//     catch (error) {
//         next(error)
//     }
// })

module.exports = router; 
