var mongoose = require('mongoose');
​
var RecipeSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  instructions: { type: String },
  cook_time:    { type: Number },
  prep_time:    { type: Number }
}, { timestamps: true } );
​
module.exports = mongoose.model('Recipe', RecipeSchema);
