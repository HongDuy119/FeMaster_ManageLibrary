import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8082/api/user/login", {
          userEmail: useremail,
          userPassword: userpassword,
        })
        .then(
          (res) => {
            console.log(res.data);

            if (res.data.message === "Email not exits") {
              alert("useremail not exits");
            } else if (res.data.message === "Login Success") {
              navigate("/home");
            } else {
              alert("Incorrect useremail and userpassword not match");
            }
          },
          (fail) => {
            console.error(fail); // Error!
          }
        );
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div>
      <div class="container">
        <div class="row">
          <h2>Login</h2>
          <hr />
        </div>

        <div class="row">
          <div class="col-sm-6">
            <form>
              <div class="form-group">
                <label>Usermail</label>
                <input
                  type="text"
                  class="form-control"
                  id="useremail"
                  placeholder="Enter Name"
                  value={useremail}
                  onChange={(event) => {
                    setuseremail(event.target.value);
                  }}
                />
              </div>

              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="userpassword"
                  placeholder="Enter Fee"
                  value={userpassword}
                  onChange={(event) => {
                    setuserpassword(event.target.value);
                  }}
                />
              </div>
              <button type="submit" class="btn btn-primary" onClick={login}>
                Login
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ float: "right", background: "green" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
