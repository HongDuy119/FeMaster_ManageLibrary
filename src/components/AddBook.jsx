import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookNumberPage, setBookNumberPage] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setBookAuthor(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBookDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setBookCategory(e.target.value);
  };

  const handleNumberPageChange = (e) => {
    setBookNumberPage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "book",
      JSON.stringify({
        bookTitle: bookTitle,
        bookDescription: bookDescription,
        bookNumberPage: bookNumberPage,
        bookAuthor: bookAuthor,
        bookCategory: bookCategory,
      })
    );
    formData.append("images", image);

    // Perform the necessary actions with the formData
    // For example, you can send it to the server using Fetch API or axios
    if (window.confirm("Bạn muốn thêm sách không?")) {
      axios
        .post(`http://localhost:8082/api/book/addBook`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Reset the form fields
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookCategory("");
    setBookNumberPage("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="bookTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="bookTitle"
              value={bookTitle}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="bookAuthor">Author</label>
            <input
              type="text"
              className="form-control"
              id="bookAuthor"
              value={bookAuthor}
              onChange={handleAuthorChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="bookDescription">Description</label>
        <textarea
          className="form-control"
          id="bookDescription"
          value={bookDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="bookCategory">Category</label>
            <input
              type="text"
              className="form-control"
              id="bookCategory"
              value={bookCategory}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="bookNumberPage">Number of Pages</label>
            <input
              type="text"
              className="form-control"
              id="bookNumberPage"
              value={bookNumberPage}
              onChange={handleNumberPageChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          className="form-control-file"
          id="image"
          onChange={handleImageChange}
        />
      </div>
      <div className="col col-md-2">
        {image && (
          <img
            className="card-img-top"
            src={URL.createObjectURL(image)}
            alt="images"
          />
        )}
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AddBook;
