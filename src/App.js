import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import './styles/tailwind.css';
import './App.css';
const App = () => (
  <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            exact={route.exact || false}
          />
        ))}
      </Routes>
    </Router>
);

export default App;
