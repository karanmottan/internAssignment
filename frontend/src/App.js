import './App.css';
import {Login} from './components/Login';
import { Register } from './components/Register';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/home/*' element={<Home/>}></Route>
          <Route path='/home/:id' element={<Home/>}></Route>
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
