var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Recipe = require('../models/recipe');

// function seedRecipes() {
//   var recipes = [
//     { title: 'Lemon Chicken',     description: 'Chicken dish', instructions: 'Cook it', cooktime: 10, preptime: 20 },
//     { title: 'The Perfect Steak', description: 'Steak dish',   instructions: 'Cook it', cooktime: 10, preptime: 20 }
//   ];

//   Recipe.find({}).remove()
//   .then(function() {
//     return Recipe.create(recipes);
//   })
//   .then(function() {
//     return Recipe.find({});
//   })
//   .then(function(found) {
//     console.log('We saved and retrieved', found.length, 'recipes.');
//   });
// }

// seedRecipes();

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

module.exports = router;
