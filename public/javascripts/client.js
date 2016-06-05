angular.module('recipesApp', ['ui.router']);

angular.module('recipesApp')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise("/home");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('recipes', {
      url: "/recipes",
      templateUrl: "views/recipes.html",
      controller: "recipesCtrl",
      controllerAs: "ctrl"
    })
    .state('recipes-show', {
      url: "/recipes/:recipeId",
      templateUrl: "views/recipes-show.html",
      controller: "recipesShowCtrl",
      controllerAs: "ctrl"
    });
});

angular.module('recipesApp')
.controller('recipesCtrl', function($http, $state) {
  console.log('recipesCtrl is alive!');

  var ctrl = this;
  ctrl.recipes = [];

  ctrl.getRecipes = function() {
    $http.get('/api/recipes').then(function(response) {
      ctrl.recipes = response.data;
      console.log('ctrl.recipes:', ctrl.recipes);
    });
  };

  ctrl.goShowPage = function(recipe) {
    $state.go('recipes-show', { recipeId : recipe._id } );
  };

  ctrl.getRecipes();
});

angular.module('recipesApp')
.controller('recipesShowCtrl', function($http, $stateParams) {
  console.log('recipesShowCtrl is alive!');

  var ctrl = this;
  ctrl.recipe = {};

  $http.get('/api/recipes/' + $stateParams.recipeId).then(function(response) {
    ctrl.recipe = response.data;
  });
});

