import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import NotFound from './pages/Error/NotFound'; // Optional: for handling 404 page
import Error from './pages/Error/Error';
export const routes = [
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/pokemon-details/:id',
    element: <Details />,
  },
  {
    path: '/Error',
    element: <Error />, 
  },
  {
    path: '*',
    element: <NotFound />,
  },
  
];
