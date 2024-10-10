import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// Importar o bootstrap
import { BrowserRouter, Route, Routes} from 'react-router-dom';

// importar paginas
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Cadastro from "./pages/Cadastro.jsx"

import NavBarra from "./components/NavBarra.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarra />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
