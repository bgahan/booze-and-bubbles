import React from 'react'
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const SavedDrinks = () => {

    const {data, loading} = useQuery(GET_ME)
    const userData = data?.me || []

    if (loading) {
        return <h2>LOADING</h2>
    }

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>My Drinks</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedCocktails?.length
                    ? 'Viewing saved drinks'
                    : 'You have no saved drinks'
                } 
                </h2>
            </Container>
            <CardColumns>
          {userData.savedCocktails?.map((drink) => {
            return (
                <Card key={drink?.drinkId} border="dark">
                {drink?.strDrinkThumb ? (
                  <Card.Img
                    src={drink?.strDrinkThumb}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{drink?.strDrink}</Card.Title>
                  <Card.Text>{drink?.strInstructions}</Card.Text>
                  <Button>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        </>
    )
}

export default SavedDrinks