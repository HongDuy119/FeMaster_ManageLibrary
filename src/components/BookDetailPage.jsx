import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import { Button } from "reactstrap";

const BookDetailPage = () => {
  const token = localStorage.getItem("token");
  const rolesString = localStorage.getItem("roles");
  const userRoles = rolesString ? JSON.parse(rolesString) : [];
  const checkRole = (userRoles) => {
    if (userRoles.includes("ADMIN")) {
      return true;
    }
    return false;
  };
  const [strar, setStar] = useState(0);

  const [book, setBook] = useState({});
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    // Thực hiện thêm sách vào giỏ hàng với số lượng đã chọn
    // Ví dụ:
    const cartItem = {
      bookId: book.bookId,
      quantity: quantity,
    };
    // Tiếp theo, bạn có thể gửi cartItem lên server hoặc lưu vào localStorage
    console.log(cartItem);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn chắc chắn muốn xóa không?")) {
      axios
        .delete(`http://localhost:8082/api/book/deleteBook/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-3">
            <img
              className="card-img-top img"
              // class ="img"
              src={`http://localhost:8082/${book.bookImage}`}
              alt={book.bookTitle}
              // class="img-fluid img-thumbnail"
            />
          </div>
          <div className="col-md-9">
            <h2 className="text-primary card-title container justify-content-center">
              {`${book.bookTitle} - ${book.bookAuthor}`}
            </h2>
            <div className="row container mt-4">
              <dt className="col-md-2">Tên sách:</dt>
              <dd className="col-md-9">{book.bookTitle}</dd>
            </div>
            <div className="row container">
              <dt className="col-md-2">Tác giả:</dt>
              <dd className="col-md-9">{book.bookAuthor}</dd>
            </div>
            <div className="row container">
              <dt className="col-md-2">Giá tiền:</dt>

              <dd className="col-md-9">{`${book.price
                ?.toLocaleString("en-US")
                .replaceAll(",", ".")} ₫`}</dd>
            </div>
            <div className="row container">
              <dt className="col-md-2">Thể loại:</dt>
              <dd className="col-md-9">{book.bookCategory}</dd>
            </div>
            <div className="container">
              <input
                style={{
                  padding: "3px 0px 7px 10px",
                  marginTop:"2px"
                }}
                type="number"
                id="quantity"
                defaultValue={0}
                name="quantity"
                min="1"
                max="100"
                className="me-2 border border-success rounded"
              />
              <Button color="danger" className="me-2">
                Thêm vào giỏ hàng
              </Button>
              <Button color="success">Mua ngay</Button>
            </div>
          </div>
          <div className="mt-4">
            <h3>Mô tả sách</h3>
            <p className="description">{book.bookDescription}</p>
          </div>
        </div>
        <div className="">
          <h3 className="">Đánh giá sản phẩm</h3>
          <dt className="mt-2">Đánh giá:</dt>
          <dt>Nhận xét</dt>
        </div>
        <div className="d-flex justify-content-end bottom-0 end-0 me-5 mb-5">
          {checkRole(userRoles) && (
            <Link
              to={`/books/edit/${book.bookId}`}
              className="text-dark btn btn-primary rounded"
            >
              Edit
            </Link>
          )}
          {checkRole(userRoles) && (
            <button
              className="text-dark btn btn-primary rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

          {/* <div className="d-flex justify-content-start position-fixed bottom-0 start-0 me-5 mb-5 ">
          <Link class="text-dark btn btn-primary rounded btn-success" to="/">
            Quay lại trang chủ
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
