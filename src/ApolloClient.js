import { ApolloClient, InMemoryCache } from '@apollo/client';

// Configure the Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000',  // URL of your backend API
  cache: new InMemoryCache(),
});

export default client;
