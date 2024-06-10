import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App.tsx'
import { Triples } from './Triples.tsx';
import { Atoms } from './Atoms.tsx';
import { Accounts } from './Accounts.tsx';


const client = new ApolloClient({
  uri: 'http://localhost:8000/subgraphs/name/0xintuition/subgraph',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/triples",
        element: <Triples />,
      },
      {
        path: "/atoms",
        element: <Atoms />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
