import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login/Login";

import Home from "./components/Home";
import BookDetailPage from "./components/BookDetailPage";
import Logic from "./components/LogicA/Logic";
import EditBook from "./components/Admin/AdminBook/EditBook";
import ContactSection from "./components/LogicA/DFS/contact";
import { useState } from "react";
import NotFound from "./components/ErrorPage/errorpage";
import AddBook from "./components/AddBook";
import Cart from "./components/Cart/Cart";
import AdminBook from "./components/Admin/AdminBook/AdminBook";

function App() {
  const token = localStorage.getItem("token");
  const rolesString = localStorage.getItem("roles");
  const userRoles = rolesString ? JSON.parse(rolesString) : [];
  // const WrappedHome = RequireLogin(Home);
  const [render, setRender] = useState(false)

  const checkRole = (userRoles)=>{
    if( userRoles.includes("ADMIN")){
      return true
    }
    return false
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/" element={ token ? <Home /> : <Login setRender={setRender} render={render} />} />
          <Route path="/books/:bookId" element={token ?<BookDetailPage />: <Login setRender={setRender} render={render} />} />
          <Route path="/logic" element={<Logic />}></Route>
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/addbook" element={<AddBook/>} />
          <Route path="/cart" element={token ?<Cart/>:<Login setRender={setRender} render={render} />} />
          <Route path="/AdminBook" element={checkRole(userRoles) ?<AdminBook/>:<Login setRender={setRender} render={render} />} />
          <Route
            path="/books/edit/:bookId"
            element={ checkRole(userRoles) ? <EditBook /> :<NotFound/>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
