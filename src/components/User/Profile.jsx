import React from "react";
import Header from "../Header";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Profile = () => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/auth/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }, []);
  return (
    <div>
      <Header></Header>
      <div className="mt-3 d-flex d-flex justify-content-center text-center">
        <div
          className="d-flex d-flex justify-content-center text-center"
          style={{ width: "40px" }}
        >
          <img
            style={{ height: "250px" }}
            src="https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg"
            className="rounded-circle"
            alt=""
          />
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-center text-center mt-2">
          <dt style={{ fontSize: "1.5rem" }}>{user?user.name:""}</dt>
        </div>
      </div>
      <div className="row mt-3  d-flex justify-content-center">
          <div className="col-md-8" style={{widows:"50px",background:"white"}}>
            <div className="row">
              <div className="form-group col-md-6">
                <dt htmlFor="bookTitle">UserName</dt>
                <input
                value={user?user.username:""}
                disabled
                  type="text"
                  className="form-control"
                  id="bookTitle"
                  required
                //   onChange={}
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookAuthor">Name</dt>
                <input
                  type="text"
                  className="form-control"
                  value={user?user.name:""}
                  id="bookAuthor"
                //   onChange={}
                  required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <dt htmlFor="date">Email</dt>
                <input
                  type="email"
                  className="form-control"
                  id="date"
                  value={user?user.email:""}
                //   onChange={}
                //   required
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookNumberPage">Số điện thoại</dt>
                <input
                  type="text"
                  className="form-control"
                  value={user?user.phone:""}
                  id="bookNumberPage"
                //   onChange={}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-12">
                <dt htmlFor="bookCategory">Address</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookCategory"
                //   onChange={}
                value={user?user.address:""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
    </div>
  );
};
export default Profile;
