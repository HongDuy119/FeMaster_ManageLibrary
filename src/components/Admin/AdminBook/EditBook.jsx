import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import Header from "../../Header";
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
  const [errorPrice, seterrorPrice] = useState("");
  const [errorNumberpage, seterrorNumberpage] = useState("");
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

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/book/getAdmin/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setBook(response.data);
        setValue("bookTitle", response.data.bookTitle);
        setValue("bookDescription", response.data.bookDescription);
        setValue("bookNumberPage", response.data.bookNumberPage);
        setValue("bookAuthor", response.data.bookAuthor);
        setValue("bookCategory", response.data.bookCategory);
        setValue("price", response.data.price);
        setValue("date", response.data.bookDate.substr(0, 10));
        const blob = new Blob([response.data.bookImage], {
          type: "image/jpeg",
        });
        const file = new File([blob], response.data.bookImage.substr(7), {
          type: "image/jpeg",
        });
        setCurrentImage(file);
        // console.log(blob);
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
        date: data.date.substr(0, 10),
      })
    );
    console.log(data.date);
    if (!image) {
      formData.append("images", currentImage);
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
          toast.success("Cập nhập sách thành công!", toastObject);

          setTimeout(() => {
            navigate(`/AdminBook`);
          }, 2000);
        } else {
          toast.warn(" Kiểm tra lại thông tin!", toastObject);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Thông tin chưa hợp lệ", toastObject);
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <Header></Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-primary m-3">
          Chào mừng bạn đến với trang sửa sách 🥰
        </h2>

        {update && <ToastContainer />}
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
                {...register("bookDescription")}
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
                  // value={book.bookDate?.substr(0,10)}
                  {...register("date")}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <dt htmlFor="bookNumberPage">Number of Pages</dt>
                <input
                  type="text"
                  className="form-control"
                  id="bookNumberPage"
                  {...register("bookNumberPage")}
                  onChange={(e) => {
                    seterrorNumberpage("");
                    if (
                      parseInt(e.target.value) % 1 !== 0 ||
                      isNaN(e.target.value)
                    )
                      seterrorNumberpage("Vui lòng nhập số nguyên!!");
                  }}
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
                  {...register("bookCategory")}
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
                  onChange={(e) => {
                    seterrorPrice("");
                    if (isNaN(e.target.value))
                      seterrorPrice("Vui lòng nhập số!!");
                  }}
                  {...register("price")}
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
    </div>
  );
};

export default EditBook;
