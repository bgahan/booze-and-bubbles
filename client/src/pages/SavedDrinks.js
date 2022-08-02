import React from 'react'
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const SaveDrinks = (props) => {

    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? GET_ME : {
      variables: { username: userParam },
    });

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>My Drinks</h1>
                </Container>
            </Jumbotron>
        </>
    )
}

export default SaveDrinks