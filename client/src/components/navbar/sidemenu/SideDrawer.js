import React from "react";
import "./SideDrawer.css";

const sideDrawer = props => {
  let drawerClasses = ["side-drawer"];

  if (props.show) {
    drawerClasses = ["side-drawer", "open"];
  }
  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <li>
          <a href="/">Product</a>
        </li>
        <li>
          <a href="/">User</a>
        </li>
        <li>
          <a href="/">Music</a>
        </li>
      </ul>
    </nav>
  );
};
export default sideDrawer;
