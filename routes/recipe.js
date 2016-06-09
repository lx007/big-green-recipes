var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Recipe = require('../models/recipe');

// INDEX Route
router.get('/', function(req, res, next) {
  Recipe.find({})
  .then(function(recipes) {
    res.json(recipes);
  });
});

// SHOW Route
router.get('/:id', function(req, res, next) {
  Recipe.findById(req.params.id)
  .then(function(recipe) {
    if (!recipe) {
      res.status(404).json( { error: 'Not found' } );
    }
    res.json(recipe);
  })
  .catch(function(err) {
    return next(err);
  });
});

// NEW/CREATE Route
// router.post('/new', function(req, res, next) {
//   User.findById(req.body.user._id)
//   .then(function(user) {
//     if(user) {
//       var newRecipe = {
//         title: '',
//         type: '',
//         description: '',
//         instructions: '',
//         cooktime: 0,
//         preptime: 0,
//         photo: ''
//       };
//       Recipe.create(newRecipe, function(err, recipe) {
//         user.recipes.push(recipe);
//         user.save(function(err, saved) {
//           return res.json({recipe: recipe, user: saved});
//         });
//       });
//     } else {
//       console.log(user);
//       return res.json({result: 'Failed'});
//     }
//   });

// });


router.post('/new', function(req, res, next) {
 var newRecipe = {
   text: req.body.text,
   type: req.body.type,
   description: req.body.description,
   instructions: req.body.instructions,
   cooktime: req.body.cooktime,
   preptime: req.body.preptime,
   photo: req.body.photo
 }

 Recipe.create(newRecipe)
 .then(function(recipe) {
   console.log(global.currentUser, recipe);
   res.json(recipe);
 });
});


module.exports = router;
