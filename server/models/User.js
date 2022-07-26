const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Cocktail.js
const cocktailSchema = require('./Cocktail');

const userSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
          type: String,
          required: true,
        },
        // set savedCocktails to be an array of data that adheres to the cocktailSchema
        savedCocktails: [cocktailSchema],
      },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `cocktailCount` with the number of saved cocktails we have
userSchema.virtual('cocktailCount').get(function () {
    return this.savedCocktails.length;
  });

const User = model('User', userSchema);

module.exports = User;