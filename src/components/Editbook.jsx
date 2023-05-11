import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditBookForm = () => {
  // const history = useHistory();
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
        const blob = new Blob([response.data.bookImage], {
          type: "image/jpeg",
        });
        const file = new File([blob], response.data.bookImage.substr(7), {
          type: "image/jpeg",
        });
        setCurrentImage(file);
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
      })
    );
    if (!image) {
      formData.append("images", currentImage);
    } else {
      formData.append("images", image);
      console.log(image);
    }
    axios
      .put(`http://localhost:8082/api/book/editBook/${bookId}`, formData, {
        headers: {
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
      {update && <ToastContainer />}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="bookTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="bookTitle"
              {...register("bookTitle")}
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
              {...register("bookAuthor")}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="bookDescription">Description</label>
        <textarea
          className="form-control"
          id="bookDescription"
          {...register("bookDescription")}
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
              {...register("bookCategory")}
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
              {...register("bookNumberPage")}
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
      <div className="row col-md-4">
        {image ? (
          <img
            className="card-img-top"
            src={URL.createObjectURL(image)}
            alt="images"
          />
        ) : (
          <img
            src={`http://localhost:8082/${book.bookImage}`}
            alt="images"
            className="card-img-top"
          />
        )}
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
  
};

export default EditBookForm;
