import React, { useEffect, useState } from "react";
import axios from "axios";
// import Modal from "react-modal";
import Header from "../Header";
import "../App.css";
import { toast } from "react-toastify";

function Cart() {
  const toastObject = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const token = localStorage.getItem("token");
  const [carts, setCarts] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/buybook/get`, {
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
  // Xoa đơn chưa đặt
  const handleDelete = (id) => {
    if (window.confirm("Bạn muốn xóa không?")) {
      axios
        .delete(
          `http://localhost:8082/api/buybook/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setRender(!render);
        })
        .catch((errr) => {
          console.log(errr);
        });
    }
  };
  // Xác nhận đặt đơn
  const hadleConfirmOrder = (id) => {
    if (window.confirm("Xác nhận đặt hàng")) {
      axios
        .put(
          `http://localhost:8082/api/buybook/editStatus/${id}`,
          { status: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          toast.success("Xác nhận thành công", toastObject);
          setRender(!render);
        })
        .catch((errr) => {
          console.log(errr);
        });
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="container">
        <h2 className="text-center text-info m-3">Giỏ hàng</h2>
        <div className="row container">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Ảnh sách</th>
                <th>Tên sách</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {carts.length === 0 ? (
                <dt style={{ fontSize: "20px" }} className="mt-4 login__error">
                  Giỏ hàng trống
                </dt>
              ) : (
                <div></div>
              )}
              {carts.map((cart) => (
                <tr
                  // style={{ justifyContent: "center", alignItems: "center" }}
                  key={cart.id}
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
                    />
                  </td>
                  <td className=""> {cart.book.bookTitle} </td>
                  <td> {cart.quantity} </td>
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
                    {cart.status === 0 ? (
                      <div>
                        <button
                          className="btn btn-danger border-bottom me-2"
                          onClick={() => handleDelete(cart.id)}
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => hadleConfirmOrder(cart.id)}
                          className="btn btn-success border-bottom"
                        >
                          Đặt hàng
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {cart.status === 1 ? (
                      <button disabled className="btn btn-danger border-bottom">
                        Loading...
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {cart.status === 2 ? (
                      <button
                        disabled
                        className="btn btn-success border-bottom"
                      >
                        Hoàn thành
                      </button>
                    ) : (
                      <div></div>
                    )}
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
export default Cart;
