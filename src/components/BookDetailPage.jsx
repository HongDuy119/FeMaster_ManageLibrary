import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import ItemComment from "./ItemComment";
import { Button } from "reactstrap";
import Rating from "@mui/material/Rating";

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
  const [star, setStar] = useState(0);

  const [book, setBook] = useState({});
  const [comment, setComment] = useState("");
  const [comments,setComments] = useState([]);
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
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
   const res = await axios.get(`http://localhost:8082/api/comment/get/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setComments(res.data);
    console.log(res.data);
  }, [bookId]);
  const handleCancelComment = () => {
    setComment("");
    setStar(0);
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
  const handleComment = () => {
    const response = axios.post(
      `http://localhost:8082/api/comment/add/${bookId}`,
      {
        comment: comment,
        star: star,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    console.log(comments);
    setComment("");
    setStar("");
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
                  marginTop: "2px",
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
          <div className="d-flex mt-2">
            <dt className="me-2">Đánh giá:</dt>
            <Rating
              name="simple-controlled"
              size="large"
              value={star}
              onChange={(event, newValue) => {
                setStar(newValue);
              }}
            />
          </div>
          <dt>Nhận xét:</dt>
          <div className="mb-2 mt-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              cols={200}
              rows="3"
              placeholder="Viết đánh giá"
              className="ps-2 w-100"
            ></textarea>
          </div>
          <div className="d-flex mb-3 float-end">
            <button
              onClick={handleCancelComment}
              className="me-4 border rounded-3 px-2 py-1 btn btn-danger"
            >
              Hủy
            </button>
            <button
              onClick={handleComment}
              className="border rounded-3 px-2 py-1 btn btn-success"
            >
              Đánh giá
            </button>
          </div>
        </div>
        {
                comments.map((item, index)=>(
                    <ItemComment key={index} item={item} />
                ))
            }
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
