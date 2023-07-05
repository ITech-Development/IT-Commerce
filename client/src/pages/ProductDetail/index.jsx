import React from "react";
import SliderProduct from "../../components/sliderProductDetails";
import CardProductDescription from "../../components/card/cardProductDescription";
// import Description from "../../components/card/cardProductDescription/description";
// import Reviews from "../../components/reviews";

function index() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-arround",
          maxWidth: "1320px",
          margin: "auto",
        }}
      >
        <SliderProduct />
        {/* <SliderProduct /> */}
        <div style={{ padding: "15px 0 0 50px" }}>
          <h2>VE Pump</h2>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <p>Rp.2.000.000</p>
            {/* <h6>Terjual 250+</h6> */}
          </div>
          <CardProductDescription />
          <button
            style={{
              cursor: "pointer",
              padding: "13px  25px",
              backgroundColor: "blue",
              color: "white",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
          >
            Order Now
          </button>
        </div>
      </div>
      {/* <Description />
      <Reviews /> */}
    </>
  );
}

export default index;
