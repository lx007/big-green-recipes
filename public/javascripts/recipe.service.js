(function() {
  'use strict';

  angular
    .module('RecipesApp')
    .service('RecipeService', RecipeService);

  /** @ngInject */
  function ItemService() {

    var that = this;

    that.resetQuantity = function() {
      _.each(that.inventory, function(recipe) {
        recipe.qty = 3;
      });
    }

    that.addOneToQuantity = function(recipe) {
      var recipe = that.findItemById(recipe.id);
      recipe.qty += 1;
      console.log(recipe);
    }

    that.removeOneFromQuantity = function(recipe) {
      var recipe = that.findItemById(recipe.id);
      recipe.qty -= 1;
    }

    that.findItemById = function(id) {
      var itemId = parseInt(id);
      return _.find(that.inventory, function(recipe) {
        return recipe.id === parseInt(itemId);
      });
    };
