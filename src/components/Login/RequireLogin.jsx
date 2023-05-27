import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireLogin = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const isLoggedIn = !!localStorage.getItem("token");
    //   const userRoles = JSON.parse(localStorage.getItem("roles"));
    //   console.log(userRoles);
      
      if (!isLoggedIn) {
        console.log(1);
        navigate("/"); // Chuyển hướng người dùng đến trang đăng nhập
        // alert("Ban can dang nhap")
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default RequireLogin;
