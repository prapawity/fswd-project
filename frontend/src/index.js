import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { SessionProvider } from './contexts/SessionContext'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloLink, ApolloProvider, concat, createHttpLink, InMemoryCache } from '@apollo/client'
import { ToastProvider } from 'react-toast-notifications';

const httpLink = createHttpLink({
  uri: 'http://ec2-54-179-31-63.ap-southeast-1.compute.amazonaws.com:3001/graphql'
})

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : "",
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: false
  }),
  credentials: 'include',
})

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <SessionProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </SessionProvider>
        </ApolloProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
