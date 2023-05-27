import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function ContactSection() {
  return (
    <div className="about-me  m-3">
      <h1>Giới thiệu về tôi</h1>
      <div className="about-me-content">
        <div className="profile-image">
          <img src={"/images/mypicture.jpg"} alt="Ảnh của tôi" />
        </div>
        <div className="profile-info">
          <h2>Họ và tên: Lê Hồng Duy</h2>
          <p>Tuổi: 20</p>
          <p>Địa chỉ: Hà Nội, Việt Nam</p>
          <p>Nghề nghiệp: Lập trình viên</p>
          <p>
            Giới thiệu: Tôi là một lập trình viên đam mê về công nghệ. Tôi có
            kinh nghiệm trong lập trình web và ứng dụng di động. Tôi yêu thích
            việc học hỏi những thứ mới mẻ và đó là lý do tại sao tôi luôn cập
            nhật với những công nghệ mới nhất trong ngành.
          </p>
        </div>
      </div>
      <div className="contact-section">
        <h2>Liên hệ với tôi</h2>
        <div className="contact-methods">
          <div className="contact-method">
            <FontAwesomeIcon icon={faFacebook} />
            <a href="https://www.facebook.com/HongDuy1109">Facebook</a>
          </div>
          <div className="contact-method">
            <FontAwesomeIcon icon={faInstagram} />
            <a href="https://www.instagram.com/hongduy_1109/">Instagram</a>
          </div>
          <div className="contact-method">
            <FontAwesomeIcon />
            <a href="mailto:duy1192002@gmail.com">duy1192002@gmail.com</a>
          </div>
          <div className="contact-method">
            <FontAwesomeIcon icon={faPhone} />
            <span>Số điện thoại: 0367382925</span>
          </div>
          <div className="contact-method">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Địa chỉ: Hà Nội, Việt Nam</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
