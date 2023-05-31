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
import AddBook from "./components/Admin/AdminBook/AddBook";
import Cart from "./components/Cart/Cart";
import AdminBook from "./components/Admin/AdminBook/AdminBook";
import AdminCart from "./components/Admin/AdminCart/AdminCart";
import Profile from "./components/User/Profile";
import AdminUser from "./components/Admin/AdminUser/AdminUser";

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
          <Route path="/AdminBook/edit/-1" element={checkRole(userRoles) ?<AddBook/>:<NotFound/>} />
          <Route path="/cart" element={token ?<Cart/>:<Login setRender={setRender} render={render} />} />
          <Route path="/AdminBook" element={checkRole(userRoles) ?<AdminBook/>:<NotFound />} />
          <Route path="/AdminCart" element={checkRole(userRoles) ?<AdminCart/>:<NotFound />} />
          <Route path="/AdminUser" element={checkRole(userRoles) ?<AdminUser/>:<NotFound />} />
          <Route path="/UserProfile" element={(token) ?<Profile/>:<NotFound />} />
          <Route
            path="/AdminBook/edit/:bookId"
            element={ checkRole(userRoles) ? <EditBook /> :<NotFound/>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
