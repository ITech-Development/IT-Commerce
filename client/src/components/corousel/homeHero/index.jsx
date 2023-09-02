import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "370px",
  width: "auto",
  margin: "auto",
};

const mediaQueryStyles = {
  "@media (max-width: 768px)": {
    divStyle: {
      height: "350px",
      width: "100%",
      maxWidth: "auto",
    },
  },
};

const slideImages = [
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1692322295/IndoTeknikMarketplace/product/banner/Banner%20Dan%20Card%20Spesial%20Kemerdekaan/Banner_Kemerdekaan_1_kr0lwq.png",
    caption: "Slide 1",
  },
  {
    url: "https://res.cloudinary.com/dcbryptkx/image/upload/v1692322296/IndoTeknikMarketplace/product/banner/Banner%20Dan%20Card%20Spesial%20Kemerdekaan/Banner_Kemerdekaan_2_tjmdw6.png",
    caption: "Slide 2",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                ...mediaQueryStyles.divStyle,
                backgroundImage: `url(${slideImage.url})`,
              }}
            ></div>
          </div>
        ))}
      </Slide>
      <style>
        {`
          .react-slideshow-container .prev-button,
          .react-slideshow-container .next-button {
            display: none !important; /* Menyembunyikan tombol navigasi */
          }
        `}
      </style>
    </div>
  );
};

export default Slideshow;
