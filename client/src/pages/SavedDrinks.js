import React from 'react'
import { Jumbotron, Container, Card, CardColumns } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const SavedDrinks = () => {
    // Return drinks by using the GET_ME query as drinks are attached to user
    const {data} = useQuery(GET_ME)
    const userData = data?.me || []

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
            <CardColumns className='p-4'>
          {userData.savedCocktails?.map((drink) => {
            return (
                <Card key={drink?.drinkId} border="dark">
                {drink?.strDrinkThumb ? (
                  <Card.Img
                    src={drink?.strDrinkThumb}
                    className="savedDrinkImg"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{drink?.strDrink}</Card.Title>
                  <Card.Text>{drink?.strInstructions}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        </>
    )
}

export default SavedDrinks