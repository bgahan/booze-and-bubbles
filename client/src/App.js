import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SavedDrinks from './pages/SavedDrinks';
import Home from './pages/Home';
import AppNavbar from './components/Navbar';

function App() {
  const httpLink = createHttpLink({
    uri: "/graphql",
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <AppNavbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/saved' component={SavedDrinks} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
