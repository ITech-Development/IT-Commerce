import React from "react";
import ProfileForm from "./updateProfile";
import HistoryCart from "./history";

function index() {
  return (
    <>
      <div style={{ margin: 'auto', maxWidth : '1420px', flexDirection: 'row-reverse'}}>
        <ProfileForm />
        <HistoryCart />
      </div>
    </>
  );
}

export default index;
