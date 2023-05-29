import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
const EditBook = () => {
  // const history = useHistory();
  const token = localStorage.getItem("token");
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [image, setImage] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [currentImage, setCurrentImage] = useState(null); // biến tạm lưu trữ ảnh hiện tại

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/book/${bookId}`)
      .then((response) => {
        setBook(response.data);
        setValue("bookTitle", response.data.bookTitle);
        setValue("bookDescription", response.data.bookDescription);
        setValue("bookNumberPage", response.data.bookNumberPage);
        setValue("bookAuthor", response.data.bookAuthor);
        setValue("bookCategory", response.data.bookCategory);
        setValue("price", response.data.price);
        const blob = new Blob([response.data.bookImage], {
          type: "image/jpeg",
        });
        const file = new File([blob], response.data.bookImage.substr(7), {
          type: "image/jpeg",
        });
        setCurrentImage(file);
        console.log(blob);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookId, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    setUpdate(true);
    formData.append(
      "book",
      JSON.stringify({
        bookTitle: data.bookTitle,
        bookDescription: data.bookDescription,
        bookNumberPage: data.bookNumberPage,
        bookAuthor: data.bookAuthor,
        bookCategory: data.bookCategory,
        price: data.price,
      })
    );
    if (!image) {
      formData.append("images", currentImage);
      console.log(currentImage);
    } else {
      formData.append("images", image);
      console.log(image);
    }
    axios
      .put(`http://localhost:8082/api/book/editBook/${bookId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data === "ok") {
          // alert("oce")
          toast.success("Cập nhập sách thành công!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            navigate(`/books/${bookId}`);
          }, 3500);
        } else {
          toast.warn(" Kiểm tra lại thông tin!", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("File ảnh chưa hợp lệ hoặc chưa nhập đúng số trang!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="d-flex justify-content-center mb-5">
        Chào mừng bạn đến với trang sửa sách
      </h1>
      {update && <ToastContainer />}
      <div className="row m-3 container">
        <div className="col-md-8">
          <div className="row">
            <div className="form-group col-md-6">
              <dt htmlFor="bookTitle">
                Title
              </dt>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                required
                {...register("bookTitle")}
              />
            </div>
            <div className="form-group col-md-6">
              <dt htmlFor="bookAuthor">Author</dt>
              <input
                type="text"
                className="form-control"
                id="bookAuthor"
                {...register("bookAuthor")}
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
              {...register("bookDescription")}
            />
          </div>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <dt htmlFor="date">Date</dt>
              <input
                type="text"
                className="form-control"
                id="date"
                // {...register("date")}
              />
            </div>
            <div className="form-group col-md-6">
              <dt htmlFor="bookNumberPage">Number of Pages</dt>
              <input
                type="text"
                className="form-control"
                id="bookNumberPage"
                {...register("bookNumberPage")}
              />
            </div>
          </div>
          <div className="row mt-2">
              <div className="form-group col-md-6">
                <dt htmlFor="bookCategory">Category</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookCategory"
                  {...register("bookCategory")}
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookAuthor">Price</dt>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  required
                  {...register("price")}
                />
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
              onChange={handleImageChange}
            />
          </div>
          <div className="row mt-2">
            <div className="col-md-3">
              {image ? (
                <img
                  className="card-img-top img1"
                  src={URL.createObjectURL(image)}
                  alt="images"
                />
              ) : (
                <img
                  src={`http://localhost:8082/${book.bookImage}`}
                  alt="images"
                  className="card-img-top img1"
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
  );
};

export default EditBook;
