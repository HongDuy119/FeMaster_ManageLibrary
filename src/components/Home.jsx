import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
// import { Base64 } from "js-base64";

// import { BrowserRouter, Link } from 'react-router-dom';

const Home = () => {
  // const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [searchOption, setSearchOption] = useState('title');
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };
  useEffect(() => {
    axios.get(`http://localhost:8082/api/book/getAll`).then((response) => {
      setBooks(response.data);
    });
  }, []);
  // console.log(searchOption);
  const onchange = (event) => {
    // setTitle(event.target.value);
    // setTitle(title.trim())
    // console.log(title);
    if (event.target.value !== "") {
      axios
        .get(
          // console.log(searchOption)
          `http://localhost:8082/api/book/getbytitle?s=${event.target.value.trim()}&s1=${searchOption}`
        )
        .then((response) => {
          setBooks(response.data);
        });
    } else {
      axios.get(`http://localhost:8082/api/book/getAll`).then((response) => {
        setBooks(response.data);
      });
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="d-flex mt-5">
        <h3 class="mr-5">Tìm kiếm sách: </h3>
        <select name="search" id="search" className="ms-2" value={searchOption} onChange={handleSearchOptionChange}>
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="author">Author</option>
          <option value="category">Category</option>
        </select>
        <input
          style={{ marginLeft: "10px" }}
          className="rounded"
          id="title"
          type="text"
          onChange={onchange}
          placeholder="Nội dung muốn tìm kiếm"
        />
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Our Bestselling Books</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {books.map((book) => (
            <div key={book.bookId} className="col">
              <div className="card">
                <img
                  src={`http://localhost:8082/${book.bookImage}`}
                  className="card-img-top img-fluid"
                  style={{height: '250px'}}
                  alt={book.bookTitle}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.bookTitle}</h5>
                  {/* <p className="card-text">{book.bookDescription}</p> */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      to={`/books/${book.bookId}`}
                      className="btn btn-outline-primary"
                    >
                      Read More
                    </Link>
                    <span className="badge bg-secondary">
                      {book.bookCategory}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
