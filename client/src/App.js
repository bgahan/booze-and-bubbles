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
  return (
    <div className="App">
      <AppNavbar />
    </div>
  );
}

export default App;
