import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./login.scss";
import "./login.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "reactstrap";

function Login(props) {
  const toastObject = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const { render, setRender } = props;
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState({
    usernameError: "",
    passwordError: "",
    result:"",
  });

  async function login(event) {
    const error = {
      usernameError: "",
      passwordError: "",
      result :"",
    };
    event.preventDefault();
    if (username.length === 0) {
      error.usernameError = "Vui lòng nhập tên đăng nhập";
    }
    if (password.length === 0) {
      error.passwordError = "Vui lòng nhập mật khẩu";
    }
    if (username.length > 0 && password.length > 0) {
      try {
        const response = await axios.post(
          "http://localhost:8082/api/auth/signin",
          {
            username: username,
            password: password,
          }
        );

        if (response.data.token) {
          toast.success("Đăng nhập thành công !!", toastObject);
          const token = response.data.token;
          const roles = response.data.roles.map((role) => role.authority);
          localStorage.setItem("token", token); // Lưu mã thông báo vào local storage
          localStorage.setItem("roles", JSON.stringify(roles));
          setTimeout(() => {
            setRender(!render);
          }, 1500);
        } else {
          // alert("Incorrect email or password");
          error.result = "Incorrect email or password !!";
          toast.error("Incorrect email or password !!", toastObject);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred during login.");
      }
    }
    setError(error);
  }

  return (
    <MDBContainer
      fluid
      style={{
        background:
          "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))",
      }}
    >
      <ToastContainer />
      <MDBRow className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase" color="white">
                Login
              </h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>
              <div className="login__error">{error.usernameError}</div>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                labelClass="text-white"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <div className="login__error">{error.passwordError}</div>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />
              <div className="login__error">{error.result}</div>
              <p className="small mb-3 pb-lg-2">
                {/* <a class="text-white-50" href="#!">
                  Forgot password?
                </a> */}
              </p>
              <Button
                outline
                className="mx-2 px-5 text-white-50 mb-5"
                style={{
                  WebkitBorderRadius: "20px",
                  borderRadius: "20px",
                  borderColor: "white",
                  color: "white",
                }}
                color="white"
                size="lg"
                onClick={login}
              >
                Login
              </Button>

              {/* <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div> */}

              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to={`/register`} className="">
                    Sign in
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
