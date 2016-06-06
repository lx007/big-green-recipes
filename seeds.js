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
  var user1  = new User({
    local: {
      email: 'example@gmail.com',
      password: 'Foobar123'
    }

  });
  var user2  = new User({
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
  var recipe1 = new Recipe({
      user: savedUsers[0],
      title: 'Lemon Chicken',
      description: 'Chicken dish',
      instructions: 'Cook it',
      cooktime: 10,
      preptime: 20
  });
  console.log('line 60');
  return Recipe.create([recipe1]);

})
.then(function(savedRecipe) {
  console.log('line 65');
  usersArray[0].recipes.push(savedRecipe[0]);
  usersArray[0].save(function() {
    console.log("line 66");
    quit();
  });
});


