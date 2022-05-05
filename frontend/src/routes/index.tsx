import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from '../pages/Home';
import Livros from '../pages/Livros';
import Login from '../pages/Login/index';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route
          path="/livros"
          element={<Livros />}
        ></Route>
        <Route
          path="/meus-alugueis"
          element={<Livros />}
        ></Route>
      </Routes>
    </Router>
  );
}
