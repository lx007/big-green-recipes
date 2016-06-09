var mongoose = require('mongoose');
var User = require("./models/user");
var Recipe = require("./models/recipe");

var usersArray;

mongoose.connect('mongodb://localhost/recipes');


function quit() {
    mongoose.disconnect();
    console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
    console.log('ERROR:', err);
    quit();
    return err;
}

console.log('Removing old users');
User.remove({})
    .then(function() {
        console.log('Old Users removed');
        console.log('Creating new users');
        var user1 = new User({
            local: {
                email: 'will@gmail.com',
                password: 'Foobar123'
            }

        });
        var user2 = new User({
            local: {
                email: 'example2@gmail.com',
                password: 'Foobar123'
            }

        });

        user1.local.password = user1.encrypt('password');
        user2.local.password = user1.encrypt('password');

        var users = [user1, user2];
        return User.create(users);
    })

.then(function(savedUsers) {
        console.log('Saved', savedUsers.length, 'Users');

        usersArray = savedUsers;

        console.log('Removing old recipes');
        Recipe.remove({})
        var recipe1 = new Recipe({
            user: savedUsers[0],
            title: 'Philly Cheeseburger',
            type: 'Beef',
            description: 'Burger',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'philly-cheeseburger.jpg'
        });
        var recipe2 = new Recipe({
            user: savedUsers[0],
            title: 'Blueberry Chicken',
            type: 'Chicken',
            description: 'Chicken dish',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'blueberry-chicken.jpg'
        });
        var recipe3 = new Recipe({
            user: savedUsers[0],
            title: 'Margarita Pizza',
            type: 'Pizza',
            description: 'Pizza',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'margarita-pizza.jpg'
        });
        var recipe4 = new Recipe({
            user: savedUsers[0],
            title: 'Modavi Salmon',
            type: 'Fish',
            description: 'Salmon dish',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'modavi-fish.jpg'
        });
        var recipe5 = new Recipe({
            user: savedUsers[0],
            title: 'Perfect Burger',
            type: 'Beef',
            description: 'Burger dish',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'perfect-burger.jpg'
        });
        var recipe6 = new Recipe({
            user: savedUsers[0],
            title: 'Pineapple Fish',
            type: 'Fish',
            description: 'Fish dish',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'pineapple-fish.jpg'
        });
        var recipe7 = new Recipe({
            user: savedUsers[0],
            title: 'Strip Steak',
            type: 'Beef',
            description: 'Steak dish',
            instructions: 'Cook it',
            cooktime: 10,
            preptime: 20,
            photo: 'strip-steak.jpg'
        });


        console.log('line 60');
        return Recipe.create([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6,
            recipe7
        ]);

    })
    .then(function(savedRecipe) {
        console.log('line 65');
        usersArray[0].recipes.push(savedRecipe[0]);
        usersArray[0].save(function() {
            console.log("line 66");
            quit();
        });
    });
