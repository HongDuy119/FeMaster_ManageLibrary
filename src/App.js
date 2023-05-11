
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
 
import Home from "./components/Home";
import BookDetailPage from './components/BookDetailPage';
import Logic from './components/LogicA/Logic';
import EditBook from './components/Editbook';
import ContactSection from './components/contact';

function App() {
  return (
    <div>
      <BrowserRouter>
            <Routes>
              <Route path="/home" element= { <Home/>} />
              <Route path="/register" element= { <Register/>} />
              <Route path="/" element= { <Login/>} />
              <Route path="/books/:bookId" element={<BookDetailPage />} />
              <Route path="/logic" element={<Logic/>}></Route>
              <Route path="/contact" element={<ContactSection/>}></Route>
              <Route path="/books/edit/:bookId" element={<EditBook/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
