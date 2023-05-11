import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
// // rating star
// const secondExample = {
//   size: 50,
//   count: 5,
//   color: "black",
//   activeColor: "red",
//   value: 7.5,
//   a11y: true,
//   isHalf: true,
//   emptyIcon: <i className="far fa-star" />,
//   halfIcon: <i className="fa fa-star-half-alt" />,
//   filledIcon: <i className="fa fa-star" />,
//   onChange: newValue => {
//     console.log(`Example 2: new value is ${newValue}`);
//   }
// };
const BookDetailPage = () => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/book/${bookId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookId]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <img
            className="card-img-top"
            src={`http://localhost:8082/${book.bookImage}`}
            alt={book.bookTitle}
          />
        </div>
        <h2 className="text-primary card-title container my-5 col-md-8 justify-content-center">{`${book.bookTitle} - ${book.bookAuthor}`}</h2>
        <div className="mt-5">
          <p
            style={{
              overflow: "hidden",
              fontSize: "16.5px",
              lineHeight: "29px",
              padding: "4px 0px 16px 0px",
            }}
          >
            {book.bookDescription}
          </p>
          <p>Category: {book.bookCategory}</p>
        </div>
      </div>
      {/* <ReactStars {...secondExample} /> */}
      <div className="d-flex justify-content-end bottom-0 end-0 me-5 mb-5 ">
        <Link
          to={`/books/edit/${book.bookId}`}
          className="text-dark btn btn-primary rounded"
        >
          Edit
        </Link>
        
        <div className="d-flex justify-content-start position-fixed bottom-0 start-0 me-5 mb-5 ">
        <Link class="text-dark btn btn-primary rounded btn-success" to="/home">
          Quay lại trang chủ
        </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
