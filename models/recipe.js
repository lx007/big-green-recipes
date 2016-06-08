var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var RecipeSchema = new mongoose.Schema({
  user:         {type: ObjectId, ref: 'User' },
  title:        { type: String, required: true },
  type:         { type: String,},
  description:  { type: String },
  instructions: { type: String },
  cooktime:     { type: Number },
  preptime:     { type: Number },
  photo:        { type: String }
}, { timestamps: true } );

module.exports = mongoose.model('Recipe', RecipeSchema);

