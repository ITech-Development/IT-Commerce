import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

// const spanStyle = {
//   padding: '20px',
//   background: '#efefef',
//   color: '#000000'
// }

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  marginTop: '66px',
  height: '500px'
}
const slideImages = [
  {
    url: 'https://res.cloudinary.com/dcbryptkx/image/upload/v1690188800/IndoTeknikMarketplace/product/banner/A_sybvhf.jpg',
    caption: 'Slide 1'
  },
  {
    url: 'https://res.cloudinary.com/dcbryptkx/image/upload/v1690188802/IndoTeknikMarketplace/product/banner/B_ei3pep.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'https://res.cloudinary.com/dcbryptkx/image/upload/v1690188796/IndoTeknikMarketplace/product/banner/C_c4cdon.jpg',
    caption: 'Slide 3'
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow;