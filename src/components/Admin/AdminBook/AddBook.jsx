import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Header from "../../Header";
import { ToastContainer, toast } from "react-toastify";

const AddBook = () => {
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
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookNumberPage, setBookNumberPage] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [errorPrice, seterrorPrice] = useState("");
  const [errorNumberpage, seterrorNumberpage] = useState("");

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
    seterrorNumberpage("");
    setBookNumberPage(e.target.value);
    if (parseInt(e.target.value) % 1 !== 0 || isNaN(e.target.value))
      seterrorNumberpage("Vui lòng nhập số nguyên!!");
    // console.log(parseInt(e.target.value));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handlePriceChange = (e) => {
    seterrorPrice("");
    setPrice(e.target.value);
    if (isNaN(e.target.value)) seterrorPrice("Vui lòng nhập số!!");
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
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
        price: price,
        date: date,
      })
    );
    formData.append("images", image);

    // Perform the necessary actions with the formData
    // For example, you can send it to the server using Fetch API or axios
    if(errorNumberpage)
    {
      toast.error("Vui lòng nhập đúng định dạng trang",toastObject);
    }
    else if(errorPrice)
    {
      toast.error("Vui lòng nhập đúng định dạng giá",toastObject);
    }
    else if (window.confirm("Bạn muốn thêm sách không?")) {
      axios
        .post(`http://localhost:8082/api/book/addBook`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //   console.log(response.data);
          navigate("/AdminBook");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Kiểm tra lại thông tin!",toastObject);
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
    <div>
      <Header></Header>
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit}>
      <h2 className="text-center text-primary m-3">Chào mừng bạn đến với trang thêm sách 🥰</h2>
        <div className="row m-3 container">
          <div className="col-md-8">
            <div className="row">
              <div className="form-group col-md-6">
                <dt htmlFor="bookTitle">Title</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookTitle"
                  required
                  onChange={handleTitleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookAuthor">Author</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookAuthor"
                  onChange={handleAuthorChange}
                  required
                />
              </div>
            </div>
            <div className="form-group mt-2">
              <dt htmlFor="bookDescription">Description</dt>
              <textarea
                style={{
                  height: "150px",
                }}
                className="form-control"
                id="bookDescription"
                onChange={handleDescriptionChange}
                required
              />
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <dt htmlFor="date">Date</dt>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookNumberPage">Number of Pages</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookNumberPage"
                  onChange={handleNumberPageChange}
                  required
                />
                <div class="login__error">{errorNumberpage}</div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <dt htmlFor="bookCategory">Category</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookCategory"
                  onChange={handleCategoryChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookAuthor">Price</dt>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  required
                  onChange={handlePriceChange}
                />
                <div class="login__error">{errorPrice}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <dt htmlFor="image">Image</dt>
              <input
                type="file"
                className="form-control-file mt-2"
                id="image"
                name="Upload"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                {image && (
                  <img
                    className="card-img-top img1"
                    src={URL.createObjectURL(image)}
                    alt="images"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-2">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
