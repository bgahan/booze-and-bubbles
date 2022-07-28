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
            const response = await searchGoogleBooks(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();

            const drinkData = items.map((drink) => ({
                idDrink: drink.id,
                strDrink: drink.strDrink || ['No drink to display'],
                strInstructions: drink.strInstructions,
                strDrinkThumb: drink.strDrinkThumb,
            }));

            setSearchedDrinks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
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

                <div className="card-display">
                    <Card style={{ width: '18rem' }} className="m-3">
                        <Card.Img variant="top" src='/images/margarita.jpeg' />
                        <Card.Body>
                            <Card.Title>Margarita</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Get the recipe!</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }} className="m-3">
                        <Card.Img variant="top" src="/images/moscow-mule.jpeg" />
                        <Card.Body>
                            <Card.Title>Moscow Mule</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Get the recipe!</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }} className="m-3">
                        <Card.Img variant="top" src="/images/pina-colada.jpeg" />
                        <Card.Body>
                            <Card.Title>Piña Colada</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Get the recipe!</Button>
                        </Card.Body>
                    </Card>
                </div>
            </>
        )
    }

    export default Home