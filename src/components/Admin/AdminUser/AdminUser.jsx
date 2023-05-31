import React, { useEffect, useState } from "react";
import axios from "axios";
// import Modal from "react-modal";
import Header from "../../Header";
import "../../App.css";

function AdminUser() {
  const token = localStorage.getItem("token");
  const [users, setUser] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/auth/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }, []);
  return (
    <div>
      <Header></Header>
      <div className="container">
        <h2 className="text-center text-primary m-3">
          Chào mừng bạn đến với trang quản lý người dùng 🥰
        </h2>
        <div>
          {/* <Link
            style={{ fontSize: "20px" }}
            to={`/AdminAddBook`}
            className="text-light btn btn-success border-bottom rounded me-2"
          >
            Thêm sách
          </Link> */}
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Ảnh</th>
                <th>Email</th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className=""
                >
                  <td>
                    <img
                      src={user.avatar?`http://localhost:8082/${user.avatar}`:"https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg"}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "5px",
                        width: "60px",
                        height: "90px",
                        objectFit: "fill",
                      }}
                      alt="cart"
                    />{" "}
                  </td>
                  <td className=""> {user.name} </td>
                  <td> {user.email} </td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminUser;
