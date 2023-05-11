import {  useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  
    const [username, setusername] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const navigate = useNavigate();

    async function save(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8082/api/user/save", {
          userName: username,
          userEmail: useremail,
          userPassword: userpassword,
          
          });
          alert("User Registation Successfully"); 
          navigate('/');

        } catch (err) {
          alert(err);
        }
      }
  
    return (
    <div>
    <div class="container mt-4" >
    <div class="card">
            <h1>User Registation</h1>
    
    <form>
        <div class="form-group">
          <label>User name</label>
          <input type="text"  class="form-control" id="username" placeholder="Enter Name"
          
          value={username}
          onChange={(event) => {
            setusername(event.target.value);
          }}
          />

        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email"  class="form-control" id="useremail" placeholder="Enter useremail"
          
          value={useremail}
          onChange={(event) => {
            setuseremail(event.target.value);
          }}
          />
 
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password"  class="form-control" id="userpassword" placeholder="Enter userpassword"
            
            value={userpassword}
            onChange={(event) => {
              setuserpassword(event.target.value);
            }}
            
            />
          </div>

        <button type="submit" class="btn btn-primary mt-4" onClick={save} >Save</button>
       
      </form>
    </div>
    </div>
     </div>
    );
  }
  
  export default Register;