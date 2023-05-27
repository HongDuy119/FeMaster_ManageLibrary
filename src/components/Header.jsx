
import { Link} from 'react-router-dom';
import { BiCart, BiLogOut } from 'react-icons/bi'; // Import the cart icon from a library like react-icons
import { useEffect, useState } from 'react';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerClass = isScrolled ? 'fixed-header' : '';
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
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light red-line ${headerClass}`}>
      <div className="container-fluid">
        <Link className="navbar-brand header-link" to="/">
      <img src="https://banner2.cleanpng.com/20190505/tki/kisspng-vector-graphics-book-stock-illustration-logo-research-vector-book-transparent-amp-png-clipart-5cce8c43c04ea6.1155603815570401957877.jpg" style={{width:100,height:40}} alt="Logo" className="logo-image me-3" />

          My Website
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
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logic">
                Logic
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                {/* <i className="bi bi-person-circle"></i> Cart */}
                <BiCart /> Cart {/* Add the cart icon component */}
              </Link>
            </li>
            <li className="nav-item">
            <button className="nav-link" onClick={handleLogout}>
                {/* <i className="bi bi-box-arrow-right"></i> Logout */}
                <BiLogOut/>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
