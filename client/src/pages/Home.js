import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth'
import { searchCocktails } from '../utils/API';
import { useMutation } from '@apollo/client'
import { SAVE_COCKTAIL } from '../utils/mutations'
import { getSavedCocktailIds, saveCocktailIds } from '../utils/localStorage'

const Home = () => {
    const [searchedDrinks, setSearchedDrinks] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedCocktailIds, setSavedCocktailIds] = useState(getSavedCocktailIds());

    useEffect(() => {
        return () => saveCocktailIds(savedCocktailIds);
      });
    //   Search engine functionality
    const handleFormSubmit = async (event) => {
        event.preventDefault();


        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchCocktails(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            let { drinks } = await response.json();
            console.log(drinks);
            // Return error message if no drinks found
            if (drinks === null) {
                drinks = [{
                    idDrink: '',
                    strDrink: 'No results found',
                    strInstructions: 'Please try your search again.',
                    strDrinkThumb: ''
                }]
                console.log(drinks);
            }

            const drinkData = drinks.map((drink) => ({
                idDrink: drink.idDrink,
                strDrink: drink.strDrink,
                strInstructions: drink.strInstructions,
                strDrinkThumb: drink.strDrinkThumb,
            })
            );

            setSearchedDrinks(drinkData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    }

    // save cocktail to database
    const [addCocktail] = useMutation(SAVE_COCKTAIL);
    // Button to save drinks to personal dashboard
    const handleClick = async idDrink => {
        const drinkInput = searchedDrinks.find(drink => drink.idDrink === idDrink)

        try {
            await addCocktail({
                variables: { input: drinkInput }
            })

            setSavedCocktailIds([...savedCocktailIds, drinkInput.idDrink]);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for Drinks!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-2" controlId="searchForm">
                            <Form.Control
                                name="searchInput"
                                className="search-input"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type="text"
                                placeholder="Enter drink name!"
                                autoComplete="off" />
                            <Form.Text className="text-muted">
                                Example: 'margarita' or 'strawberry daiquiri'
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Container>
            </Jumbotron>
            {/* Container to display all results in cards */}
            <Container>
                <h2>
                    {searchedDrinks.length
                        ? `Viewing ${searchedDrinks.length} results:`
                        : ''}
                </h2>
                <CardColumns>
                    {searchedDrinks.map((drink) => {
                        return (
                            <Card key={drink.idDrink} border='dark'>
                                {drink.strDrinkThumb ? (
                                    <Card.Img src={drink.strDrinkThumb} alt={`${drink.strDrink}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{drink.strDrink}</Card.Title>

                                    <Card.Text>{drink.strInstructions}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedCocktailIds?.some((saveCocktailId) => saveCocktailId === drink.idDrink)}
                                            className="btn-block btn-info"
                                            onClick={() => handleClick(drink.idDrink)}
                                        >
                                            {/* If drink previously saved then grey out the save button */}
                                            {savedCocktailIds?.some(saveCocktailId => saveCocktailId === drink.idDrink)
                                                ? "Saved!"
                                                : "Save this drink!"}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    )
}

export default Home