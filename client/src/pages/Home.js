import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchCocktails } from '../utils/API';

const Home = () => {
    const [searchedDrinks, setSearchedDrinks] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    // const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedDrinkIds());

    // useEffect(() => {
    //     return () => saveDrinkIds(savedDrinkIds);
    //   });

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
    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for Drinks!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-2" controlId="searchForm">
                            <Form.Control
                                name="searchInput"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type="text"
                                placeholder="Enter drink name!" />
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

            <Container>
                <h2>
                    {searchedDrinks.length
                        ? `Viewing ${searchedDrinks.length} results:`
                        : 'Enter a cocktail!'}
                </h2>
                <CardColumns>
                    {searchedDrinks.map((drink) => {
                        return (
                            <Card key={drink.idDrink} border='dark'>
                                {drink.strDrinkThumb ? (
                                    <Card.Img src={drink.strDrinkThumb} alt={`The cover for ${drink.strDrink}`} variant='top' />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{drink.strDrink}</Card.Title>

                                    <Card.Text>{drink.strInstructions}</Card.Text>
                                    {/* {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedDrinkIds?.some((savedDrinkId) => savedDrinkId === book.bookId)}
                                                className='btn-block btn-info'
                                                onClick={() => handleSaveBook(book.bookId)}>
                                                {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                                                    ? 'This book has already been saved!'
                                                    : 'Save this Book!'}
                                            </Button>
                                        )} */}
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