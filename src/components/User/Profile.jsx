import React from "react";
import Header from "../Header";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const [render,setRender] = useState(false);
  const [id,setId] = useState("")
  const [username,setUsername] = useState("");
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [open,setOpen] = useState(false);
  const [image,setImage] = useState("")
  const [avatarview,setAvatarview] = useState("");
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
        setUsername(response.data.username)
        setId(response.data.id);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setAvatarview(response.data.avatar?`http://localhost:8082/${response.data.avatar}`:"https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg");
      })
      .catch((errr) => {
        console.log(errr);
      });
  }, [render]);
  const handleUpdate = () =>{
    const formData = new FormData();
    formData.append(
      "request1",
      JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address,
      })
    );
    if (window.confirm("Bạn muốn cập nhập thông tin?")) {
      const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if(phone.length !== 10 || isNaN(phone))
      {
          toast.error("Số điện thoại nhập chưa hợp lệ",toastObject);
      }
      else if(!emailPattern.test(email))
      {
        toast.error("Email chưa hợp lệ",toastObject);
      }
      else axios
        .put(`http://localhost:8082/api/auth/updateProfile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //   console.log(response.data);
          // navigate("/AdminBook");
          setRender(!render);
          toast.success("Cập nhập thông tin thành công",toastObject);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const handleChangeAvatar = () =>{
    setOpen(true);
    if(open)
    {
      if(window.confirm("Xác nhận cập nhập ảnh đại diện"))
      {
        axios
        .put(`http://localhost:8082/api/auth/updateAvatar`, {image:image}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //   console.log(response.data);
          setRender(!render);
          toast.success("Cập nhập thành công",toastObject);
            console.log(response.data);
            setOpen(false)
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }

  }
  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <div className="mt-3 d-flex d-flex justify-content-center text-center">
        <div
          className="d-flex d-flex justify-content-center text-center"
          style={{ width: "40px" }}
        >
          <img
            style={{ height: "250px" }}
            src={avatarview}
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
                value={username}
                disabled
                  type="text"
                  className="form-control"
                  id="bookTitle"
                  required
                  // onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookAuthor">Name</dt>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  id="bookAuthor"
                  onChange={(e)=>setName(e.target.value)}
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
                  value={email}
                  onChange={(e) =>{setEmail(e.target.value)}}
                //   required
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookNumberPage">Số điện thoại</dt>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  id="bookNumberPage"
                  onChange={(e) => setPhone(e.target.value)}
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
                  onChange={(e)=>setAddress(e.target.value)}
                value={address}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <button onClick={handleUpdate} type="submit" className="btn btn-primary rounded-circle me-2">
            Update
          </button>
          <button onClick={handleChangeAvatar} type="submit" className="btn btn-primary rounded-circle">
            Change avatar
          </button>
          {open && <input required onChange={(e)=>{setImage(e.target.files[0])}} type="file"></input>}
        </div>
    </div>
  );
};
export default Profile;
