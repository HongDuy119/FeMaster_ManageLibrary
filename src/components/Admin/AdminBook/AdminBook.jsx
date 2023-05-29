import React, { useEffect, useState } from "react";
import axios from "axios";
// import Modal from "react-modal";
import Header from "../../Header";
import { Link } from "react-router-dom";

function AdminBook() {
  const token = localStorage.getItem("token");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/book/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="container">
        <h2 className="text-center m-3">Đây là trang quản lý sách</h2>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th>Ảnh sách</th>
                <th>Tên sách</th>
                <th>Thể loại</th>
                <th>Mô tả</th>
                <th>Tác giả</th>
                <th>Số lượng trang</th>
                <th>Giá</th>
                <th>Ngày phát hành</th>
                <th>Hoạt động</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {books.map((book) => (
                <tr
                  // style={{ justifyContent: "center", alignItems: "center" }}
                  key={book.bookId}
                  className=""
                >
                  <td>
                    <img
                      src={`http://localhost:8082/${book.bookImage}`}
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
                  <td className=""> {book.bookTitle} </td>
                  <td> {book.bookCategory} </td>
                  <td>{book.bookDescription?.substring(0, 20)}...</td>
                  <td>{book.bookAuthor}</td>
                  <td>{book.bookNumberPage}</td>
                  <td>{book.price}</td>
                  <td>{book.bookDate}</td>
                  <td>
                    <div className="d-block">
                      <Link
                        style={{ fontSize: "10px" }}
                        to={`/books/edit/${book.bookId}`}
                        className="text-light btn btn-success border-bottom rounded me-2"
                      >
                        Chi tiết
                      </Link>
                      <button
                        style={{ fontSize: "10px" }}
                        className="btn btn-danger border-bottom"
                      >
                        Xóa
                      </button>
                    </div>
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
export default AdminBook;
