import React from 'react';

function Footer() {
    return (
        <footer className="footer" style={{background:"linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))"}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 text-light">
                        <h3>Thông tin</h3>
                        <ul>
                            <li><a href="/">Về chúng tôi</a></li>
                            <li><a href="/">Chính sách bảo mật</a></li>
                            <li><a href="/">Điều khoản sử dụng</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Hỗ trợ</h3>
                        <ul>
                            <li><a href="/">Hướng dẫn mua hàng</a></li>
                            <li><a href="/">Hướng dẫn thanh toán</a></li>
                            <li><a href="/">Chính sách đổi trả</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Liên hệ</h3>
                        <p>123 Đường ABC, Quận XYZ, TP ABC</p>
                        <p>Email: info@example.com</p>
                        <p>Điện thoại: 123-456-7890</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">© 2023 Tên Công ty. Tất cả các quyền được bảo lưu.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
