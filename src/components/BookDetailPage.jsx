import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import ItemComment from "./ItemComment";
import { Button } from "reactstrap";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetailPage = () => {
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
  const [comments, setComments] = useState([]);
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [quantity,setQuantity] = useState(0);

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
      // Api get commet
    const apiGetComment = async () => {
      const res = await axios.get(
        `http://localhost:8082/api/comment/get/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(res.data);
    };
    apiGetComment();
  }, [bookId, render]);

  // Hủy comment
  const handleCancelComment = () => {
    setComment("");
    setStar(0);
  };
  // Hủy comment
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
  // Submit Comment
  const handleComment = () => {
    axios
      .post(
        `http://localhost:8082/api/comment/add/${bookId}`,
        {
          comment: comment,
          star: star,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if(response.data === "Truemess") {
          toast.success("Comment thanh cong!!", toastObject);
          // Đảo ngược giá trị của render để kích hoạt render lại
          setComment("");
          setStar(0);
          setRender(!render);
        }
        else if(response.data === "falseStar") toast.error("Vui lòng đánh giá sao!!",toastObject);
        else toast.error("Vui lòng commet nội dung!!",toastObject);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Thêm vào giỏ hàng
  const handleOrderBook = () =>{
    axios
      .post(
        `http://localhost:8082/api/buybook/addbuy/${bookId}`,
        {
          quantity:quantity,
          status:0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if(response.data === "trueBuy"){
          toast.success("Bạn đã thêm sách vào giỏ thành công.",toastObject);
          setQuantity(0);
        } 
        else if(response.data === "falseQuantity") toast.error("Vui lòng chọn số lượng trước khi thêm vào giỏ hàng!",toastObject);
        else toast.error("Loi",toastObject);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Mua sách
  const handleBuyBook = ()=>{
    axios
      .post(
        `http://localhost:8082/api/buybook/addbuy/${bookId}`,
        {
          quantity:quantity,
          status:1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if(response.data === "trueBuy"){
          toast.success("Bạn đã mua sách thành công.",toastObject);
          setQuantity(0);
        } 
        else if(response.data === "falseQuantity") toast.error("Vui lòng chọn số lượng trước khi mua!",toastObject);
        else toast.error("Loi",toastObject);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <div className="container my-2">
        <div className="row">
          <div className="col-md-3">
            <img
              className="card-img-top img"
              // class ="img"
              src={`http://localhost:8082/${book.bookImage}`}
              alt={book.bookTitle}
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
                onChange={(e)=>{
                  setQuantity(e.target.value)
                }}
                type="number"
                id="quantity"
                defaultValue={0}
                value={quantity}
                name="quantity"
                min="1"
                max="100"
                className="me-2 border border-success rounded"
              />
              <Button onClick={handleOrderBook} color="danger" className="me-2">
                Thêm vào giỏ hàng
              </Button>
              <Button onClick={handleBuyBook} color="success">Mua ngay</Button>
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
        {comments.map((item, index) => (
          <ItemComment key={index} item={item} />
        ))}
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
