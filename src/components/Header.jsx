import { Link, useNavigate } from "react-router-dom";
import { BiCart, BiLogOutCircle } from "react-icons/bi"; // Import the cart icon from a library like react-icons
import {CgProfile} from "react-icons/cg"
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [render,setRender] = useState(false);
  const navigate = useNavigate();
  const rolesString = localStorage.getItem("roles");
  const token = localStorage.getItem("token");
  const userRoles = rolesString ? JSON.parse(rolesString) : []; 
  const [user,setUser] = useState("");
  const checkRole = (userRoles)=>{
    if( userRoles.includes("ADMIN")){
      return true
    }
    return false
  }
  useEffect(() => {
    if(!render)
    {
      axios
      .get(`http://localhost:8082/api/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUser(response.data);
        setRender(true)
      })
      .catch((errr) => {
        console.log(errr);
      });
    }
  }, [render]);
  const [showOptions, setShowOptions] = useState(false);

  const handleProfileClick = () => {
    setShowOptions(false);
    navigate("/UserProfile")
    
    // Thực hiện hành động khi nhấp vào Profile
    // Ví dụ: Hiển thị trang profile
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const headerClass = isScrolled ? "fixed-header" : "";
  // const navigate = useNavigate();
  const handleLogout = () => {
    // Thực hiện các bước xử lý khi logout
    // Ví dụ: Xóa token, xóa thông tin người dùng khỏi storage, điều hướng đến trang đăng nhập, vv.

    // Xóa token từ localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    // Điều hướng đến trang đăng nhập
    window.location.reload();
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const isTop = scrollTop === 0;
      setIsScrolled(!isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light red-line ${headerClass}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand header-link" to="/">
          <img
            src={"https://banner2.cleanpng.com/20190505/tki/kisspng-vector-graphics-book-stock-illustration-logo-research-vector-book-transparent-amp-png-clipart-5cce8c43c04ea6.1155603815570401957877.jpg"}
            style={{ width: 100, height: 40 }}
            alt="Logo"
            className="logo-image me-3"
          />
          {!checkRole(userRoles)?"Thư viện online":"Hệ thống quản lý thư viện"}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <button style={{height:"35px"}} className="text-dark btn btn-outline-info rounded border border-light">Home</button>
              </Link>
            </li>
            {
              checkRole(userRoles) &&
              (<li className="nav-item">
              <Link className="nav-link" to="/AdminBook">
                <button  style={{height:"35px"}} className="text-dark btn btn-outline-info rounded border border-light">Quản lý sách</button>
              </Link>
            </li>)
            }
            {
              checkRole(userRoles)&&
              (<li className="nav-item">
              <Link className="nav-link" to="/AdminCart">
              <button style={{height:"35px"}} className="text-dark btn btn-outline-info rounded border border-light">Quản lý đơn hàng</button>
              </Link>
            </li>)
            }
            {
              checkRole(userRoles)&&
              (<li className="nav-item">
              <Link className="nav-link" to="/AdminUser">
              <button style={{height:"35px"}} className="text-dark btn btn-outline-info rounded border border-light">Quản lý người dùng</button>
              </Link>
            </li>)
            }
          </ul>
        </div>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                {/* <i className="bi bi-person-circle"></i> Cart */}
                <dt style={{
                  fontSize:"1.1rem"
                }}><BiCart /> Cart</dt> {/* Add the cart icon component */}
              </Link>
            </li>
            <li className="nav-item">


              <div className="user-profile mt-1" style={{ width: "30px" }}>
                <img
                  className="w-100 border rounded-circle ms-2"
                  src={user.avatar?`http://localhost:8082/${user.avatar}`:"https://cdn-icons-png.flaticon.com/512/1946/1946429.png"}
                  alt="User Image"
                  onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                  <div
                    className="user-options notification-content list-group"
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      right: "25px",
                      top: "55px",
                      background: "white",
                    }}
                  >
                    <div>
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      class="btn btn-outline-secondary list-group-item list-group-item-action"
                    >
                       {<CgProfile></CgProfile>} Profile
                    </button>
                    </div>
                    <button
                      type="button"
                      class="btn btn-outline-secondary list-group-item list-group-item-action"
                      onClick={handleLogout}
                    >
                      {<BiLogOutCircle/>} Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
