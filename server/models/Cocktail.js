const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCocktails` array in User.js
const cocktailSchema = new Schema({
    // "strDrink" in cocktail API
    drinkName: [
        {
            type: String,
        },
    ],
    // strInstructions
    instructions: {
        type: String,
        required: true,
    },
    // idDrinkfrom cocktail API
    drinkId: {
        type: String,
        required: true,
    },
    // strDrinkThumb from cocktail API
    image: {
        type: String,
    }
});

module.exports = cocktailSchema;