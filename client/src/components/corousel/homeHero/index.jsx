import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  alignContent :'center',
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "350px",
  width: "94%",
  maxWidth: "100%",
  margin: "35px 10px 0 45px",
  border: "none",
  borderRadius: "10px",
};

const mediaQueryStyle = {
  width: "97%", // Adjust the width as needed for smaller screens
  maxHeight: "100px", // Set a maximum height for the images
  margin: "145px 70px 0 5px",
  border: "none",
  borderRadius: "5px",
};

const slideImages = [
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1692322295/IndoTeknikMarketplace/product/banner/Banner%20Dan%20Card%20Spesial%20Kemerdekaan/Banner_Kemerdekaan_1_kr0lwq.png",
    caption: "Slide 1",
  },
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1696228243/IndoTeknikMarketplace/product/banner/Banner%20Hari%20Batik/Banner_Hari_Batik_Website_dnsbmr.jpg",
    caption: "Slide 2",
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
