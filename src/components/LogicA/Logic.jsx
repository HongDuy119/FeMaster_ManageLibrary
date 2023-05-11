import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";  
import Npl from "./Npl1";
import Dfs from "./DFS/Dfs";
const Logic = () => {
  const [activeTab, setActiveTab] = useState("DFS");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Algorithm Types</h2>
      <Nav tabs className="container my-5">
        <NavItem>
          <NavLink
            className={activeTab === "DFS" ? "active" : ""}
            onClick={() => toggleTab("DFS")}
          >
            DFS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "BFS" ? "active" : ""}
            onClick={() => toggleTab("BFS")}
          >
            BFS
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "Language" ? "active" : ""}
            onClick={() => toggleTab("Language")}
          >
            Ngôn ngữ
          </NavLink>
        </NavItem>
      </Nav>
      {activeTab === "DFS" && (
        <div>
          <p>
            <h3>DFS (Depth-First Search)</h3>
          </p>
          <ul>
            <li>
              Là thuật toán tìm kiếm theo chiều sâu, bắt đầu từ 1 đỉnh được chọn
              và duyệt sâu vào đồ thị.
            </li>
            <li>
              Trong quá trình duyệt, thuật toán sẽ đi theo một nhánh của đồ thị
              đến khi không còn đỉnh nào nữa, sau đó quay lại và tiếp tục duyệt
              các nhánh khác của đồ thị.
            </li>
            <li>
              Để duyệt đồ thị bằng DFS, ta có thể sử dụng đệ quy hoặc sử dụng
              stack để lưu trữ các đỉnh.
            </li>
            <li>
              Thuật toán DFS đảm bảo sẽ duyệt hết tất cả các đỉnh của đồ thị.
              Tuy nhiên, thứ tự duyệt sẽ khác nhau tùy vào đỉnh bắt đầu được
              chọn.
            </li>
          </ul>
          <img src="/images/DFS.png" alt="DFS"/>
          <Dfs></Dfs>
          {/* <Dfs></Dfs> */}
        </div>
      )}
      {activeTab === "BFS" && (
        <div>
          <h3>BFS (Breadth-First Search)</h3>
          <ul>
            <li>
              BFS là một thuật toán tìm kiếm theo chiều rộng, bắt đầu từ một
              đỉnh được chọn và duyệt theo tầng của đồ thị.
            </li>
            <li>
              Trong quá trình duyệt, thuật toán sẽ duyệt tất cả các đỉnh cùng
              cấp trước khi đi tiếp sang các đỉnh cấp kế tiếp.
            </li>
            <li>
              Để duyệt đồ thị bằng BFS, ta sử dụng queue để lưu trữ các đỉnh.
              Đỉnh bắt đầu được cho vào queue, sau đó duyệt lần lượt các đỉnh
              khác trong queue.
            </li>
            <li>
              Thuật toán BFS đảm bảo sẽ duyệt hết tất cả các đỉnh của đồ thị
              theo thứ tự từ trên xuống dưới, từ trái sang phải.
            </li>
          </ul>
          <img src="/images/BFS.png" alt="BFS" />
        </div>
      )}
      {activeTab === "Language" && (
        <div>
          <div>
          <h3>NLP (Natural language processing)</h3>
          </div>
          <Npl></Npl>
        </div>
      )}
      {/* <div class="btn btn-primary fixed-right fixed-bottom  rounded btn-success w-25"> */}
        <div className="d-flex justify-content-end position-fixed bottom-0 end-0 me-5 mb-5 ">
        <Link class="text-dark btn btn-primary rounded btn-success" to="/home">
          Quay lại trang chủ
        </Link>
        </div>
      {/* <div/> */}
    </div>
  );
};

export default Logic;
