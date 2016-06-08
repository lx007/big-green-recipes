var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var RecipeSchema = new mongoose.Schema({
  user:         {type: ObjectId, ref: 'User' },
  title:        { type: String, required: true },
  description:  { type: String },
  instructions: { type: String },
  cooktime:     { type: Number },
  preptime:     { type: Number }
}, { timestamps: true } );

module.exports = mongoose.model('Recipe', RecipeSchema);

