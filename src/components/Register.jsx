import {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "reactstrap";
function Register() {
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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    // const [roles,setRoles] = ([]);
    const navigate = useNavigate();

    async function save(event) {
        event.preventDefault();
        // console.log(roles);
        try {
          const response = await axios.post("http://localhost:8082/api/auth/signup", {
          username: username,
          email: email,
          name: name,
          password:password,
          roles:["user"],
          });
          console.log(response.data.message);
          if(response.data.message==="nouser")
          {
            toast.error("Đã tồn tại Username !!", toastObject);
          }
          else if(response.data.message==="noemail")
          {
            toast.error("Email đã được sử dụng!!", toastObject);
          } 
          else
          {
            toast.success("Đăng kí thành công !!", toastObject);
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }

        } catch (err) {
          alert(err);
        }
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
                    Register
                  </h2>
                  {/* input name */}
                  {/* <div className="login__error">{error.usernameError}</div> */}
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    labelClass="text-white"
                    label="Full name"
                    id="nameFormControlLg"
                    type="text"
                    size="lg"
                  />
                  {/*input email */}
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    labelClass="text-white"
                    label="Email address"
                    id="emailFormControlLg"
                    type="email"
                    size="lg"
                  />
                  {/* input username */}
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    labelClass="text-white"
                    label="Username"
                    id="usernameFormControlLg"
                    type="text"
                    size="lg"
                  />
                  {/* <div className="login__error">{error.passwordError}</div> */}
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    labelClass="text-white"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                  />
                  {/* <div className="login__error">{error.result}</div> */}
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
                    onClick={save}
                  >
                    Register
                  </Button>
                  <div>
                <p className="mb-0">
                  Have an account?{" "}
                  <Link to={`/`} className="">
                    Sign up
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
  
  export default Register;