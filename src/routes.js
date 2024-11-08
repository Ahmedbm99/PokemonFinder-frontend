import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import NotFound from './pages/Error/NotFound'; 
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
