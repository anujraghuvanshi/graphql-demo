import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import BookList from './components/BookList'
import AddBook from './components/AddBook'


//apollo cilent
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App" id="main">
          <h1>Ninja reading list</h1>
          <BookList/>
          <AddBook/>
          
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
