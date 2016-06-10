angular.module('recipesApp', [
    'ui.router',
    'ui.bootstrap'
]);

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
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "mainCtrl",
                controllerAs: "ctrl"
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "views/signup.html",
                controller: "mainCtrl",
                controllerAs: "ctrl"
            })
            .state('user-recipes', {
                url: "/recipes/:userId",
                templateUrl: "views/user-recipes.html",
                controller: "userRecipesCtrl",
                controllerAs: "ctrl"
            })
            .state('recipes-new', {
                url: "/recipes/new",
                templateUrl: "views/recipes-new.html",
                controller: "mainCtrl",
                controllerAs: "ctrl"
            });
    });

// RECIPES CONTROLLER
angular.module('recipesApp')
    .controller('recipesCtrl', function($http, $state) {
        console.log('recipesCtrl is alive!');

        var ctrl = this;
        ctrl.recipes = [];
        ctrl.new

        ctrl.getRecipes = function() {
            $http.get('/api/recipes').then(function(response) {
                ctrl.recipes = response.data;
            });
        };

        ctrl.goShowPage = function(recipe) {
            $state.go('recipes-show', { recipeId: recipe._id });
        };

        ctrl.getRecipes();
    });

// RECIPES SHOW CONTROLLER
angular.module('recipesApp')
    .controller('recipesShowCtrl', function($http, $stateParams) {
        console.log('recipesShowCtrl is alive!');

        var ctrl = this;
        ctrl.recipe = {};

        $http.get('/api/recipes/' + $stateParams.recipeId).then(function(response) {
            ctrl.recipe = response.data;
        });
    });

// MAIN CONTROLLER
angular.module('recipesApp')
    .controller('mainCtrl', function($stateParams, $state, $http) {
        console.log('mainCtrl is alive!');
        var vm = this;
        vm.recipe = {};



        vm.newRecipe = {
            title: "",
            type: "",
            description: "",
            instructions: "",
            preptime: 0,
            cooktime: 0,
            photo: ""
        };


        vm.user;
        vm.email;
        vm.password;

        // vm.data = {
        //     email: '',
        //     password: ''
        // };

        vm.checkCurrentUser = function() {
            $http.get('/currentUser')
                .then(function(results) {
                    console.log(results);
                    if (results.data) {
                        vm.user = results.data;
                    }
                });
        }

        vm.checkCurrentUser();

        vm.submitLogin = function() {
            console.log('submitLogin');
            console.log(vm.data);
            console.log(vm.email);
            console.log(vm.password);

            $http.post('/login', vm.data)
                .then(function(response) {
                    if (response.data) {
                        console.log('You have logged in');
                        vm.user = response.data;
                        vm.errorMessage = undefined;
                        $state.go('recipes', { userId: vm.user._id });
                        console.log('line 122 after /login')
                    } else {
                        console.log('fail at line 119');
                        vm.errorMessage = 'Incorrect Email or Password';
                    }
                });
        }

        vm.submitSignup = function() {
            console.log(vm.data + 'line 131');
            console.log(vm.data.email + 'line 131');
            console.log(vm.data.password + 'line 131');
            $http.post('/signup', vm.data)
                .then(function(response) {
                    if (response.data.result === 'Success') {
                        console.log('Success!');
                        console.log(response.data.user);
                        vm.user = response.data.user;
                        $state.go('recipes', { userId: vm.user._id });
                    } else {
                        console.log('Failure!');
                    }
                });
        }

        vm.logout = function() {
            console.log(vm.email);
            vm.user = undefined;
            vm.email = undefined;
            vm.password = undefined;
            $state.go('home');
        }



        vm.addRecipe = function() {
            console.log('adding newRecipe:', vm.newRecipe);
            $http
                .post('/api/recipes/new', vm.newRecipe)
                .then(function(response) {
                    console.log('new recipe added.');
                    console.log(response);
                    vm.getRecipes();
                }, function(err) {
                    alert('something went wrong!');
                });
            vm.newRecipe = {};
            console.log("add recipe is working");
        };

        // vm.createNewRecipe = function() {
        //     console.log('submitted');
        //     $http.post('/recipes-new', { user: vm.user, email: vm.email, password: vm.password })
        //         .then(function(results) {
        //             console.log('successfully created new recipe');
        //             vm.user = results.data.user;
        //             $state.go('recipes', { recipeId: results.data.user-recipes._id })
        //         });
        // }

        vm.isRecipePage = function() {
            return $state.current.name === 'recipe';
        }

        vm.isHomePage = function() {
            return $state.current.name === 'home';
        }

    });
