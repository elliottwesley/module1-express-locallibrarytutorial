var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return ( this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '' ) + " - "  + ( this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '' );
    // the above line checks if there is a value for date_of_birth, applying (and formatting, thanks to the npm moment package) if there is one, otherwise returning a blank string.  Same for date_of_death.
    // Otherwise, today's date would be erroneously applied to both of these.
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);