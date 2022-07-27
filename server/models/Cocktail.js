const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCocktails` array in User.js
const cocktailSchema = new Schema({
    // strDrink in cocktail API
    strDrink:
    {
        type: String,
        required: true,
    },
    // strInstructions
    strInstructions: {
        type: String,
        required: true,
    },
    // idDrink from cocktail API
    idDrink: {
        type: String,
        required: true,
    },
    // strDrinkThumb from cocktail API
    strDrinkThumb: {
        type: String,
        required: true,
    }
});

module.exports = cocktailSchema;