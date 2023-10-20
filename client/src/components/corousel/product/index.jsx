import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./productcor.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  margin: "86px 10px 0 35px",
  height: "380px",
  width: "94%",
  maxWidth: "100%",
  border: "none",
  borderRadius: "5px",
};

const mediaQueryStyle = {
  /* Add your styles for devices with a maximum width of 768px here */
  width: "97%", // Adjust the width as needed for smaller screens
  maxHeight: "100px", // Set a maximum height for the images
  margin: "80px 70px 0 5px",
  border: "none",
  borderRadius: "5px",
};

const slideImages = [
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1697688072/IndoTeknikMarketplace/product/banner/Banner%20Product/Product_1_yjs1se.png",
    caption: "Slide 1",
  },
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1697688070/IndoTeknikMarketplace/product/banner/Banner%20Product/Product_2_edetou.png",
    caption: "Slide 2",
  },
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1697688070/IndoTeknikMarketplace/product/banner/Banner%20Product/Product_3_dlrfof.png",
    caption: "Slide 3",
  },
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1697688072/IndoTeknikMarketplace/product/banner/Banner%20Product/Product_4_jcrygz.png",
    caption: "Slide 4",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide
        images={slideImages.map((slideImage) => slideImage.url)}
        prevArrow={<div></div>}
        nextArrow={<div></div>}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                ...(window.innerWidth <= 768 ? mediaQueryStyle : {}),
                backgroundImage: `url(${slideImage.url})`,
              }}
            >
              {/* You can add caption or content here */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
