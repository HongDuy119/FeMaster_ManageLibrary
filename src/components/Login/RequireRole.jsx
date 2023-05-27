import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireRole = (requiredRoles) => (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const isLoggedIn = !!localStorage.getItem("token");
      const rolesString = localStorage.getItem("roles");
      console.log(rolesString);
      const userRoles = rolesString ? JSON.parse(rolesString) : [];

      console.log(rolesString);

      if (!isLoggedIn || !userRoles || !hasRequiredRoles(userRoles)) {
        // alert("Ban khong du tham quyen")
        navigate("/"); // Redirect to the login page or unauthorized page
      }
    }, [navigate]);

    const hasRequiredRoles = (userRoles) => {
      return requiredRoles.some((requiredRole) =>
        userRoles.includes(requiredRole)
      );
    };

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default RequireRole;
