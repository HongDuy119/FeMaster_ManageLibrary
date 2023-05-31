import React, { useEffect, useState } from "react";
import axios from "axios";
// import Modal from "react-modal";
import Header from "../../Header";
import "../../App.css";

function AdminCart() {
  const token = localStorage.getItem("token");
  const [carts, setCarts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/buybook/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setCarts(response.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }, [render]);
  const handleSearchOptionChange = (e,id)=>{
    axios
      .put(`http://localhost:8082/api/buybook/editStatus/${id}`, 
      {status:e.target.value},{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setRender(!render)
      })
      .catch((errr) => {
        console.log(errr);
      });
  }
  return (
    <div>
      <Header></Header>
      <div className="container">
        <h2 className="text-center text-primary m-3">
          Chào mừng bạn đến với trang quản lý đơn hàng 🥰
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
                <th>Ảnh sách</th>
                <th>Tên sách</th>
                <th>Tên người dùng</th>
                <th>Số điện thoại</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {carts.map((cart) => (
                <tr
                  // style={{ justifyContent: "center", alignItems: "center" }}
                  key={carts.id}
                  className=""
                >
                  <td>
                    <img
                      src={`http://localhost:8082/${cart.book.bookImage}`}
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
                  <td className=""> {cart.book.bookTitle} </td>
                  <td> {cart.user.name} </td>
                  <td>{cart.user.phone}</td>
                  <td>{cart.quantity}</td>
                  <td>
                    {cart.status === 1 ? (
                      <button disabled class="btn btn-primary border rounded">
                        Đang giao hàng
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {cart.status === 0 ? (
                      <button disabled class="btn btn-danger border rounded">
                        <div>Chưa đặt hàng</div>
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {cart.status === 2 ? (
                      <button disabled class="btn btn-success border rounded">
                        Giao hàng thành công
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td>
                    <select
                    onChange={(event)=>handleSearchOptionChange(event,cart.id)}
                      class="form-select form-select-sm btn-light border rounded" style={{width:"200px",fontSize:"15px"}}
                      // aria-label=".form-select-lg example"
                    >
                      <option value="1" selected = {cart.status===1} >Đang giao hàng</option>
                      <option value="2" selected = {cart.status===2}>Giao hàng thành công</option>
                      <option value="0" selected = {cart.status===0}>Chưa đặt hàng</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminCart;
