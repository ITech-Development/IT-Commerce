import React from "react";
import Corousel from '../../corousel/homeHero'

export default function Index() {
  // const [isTextVisible, setIsTextVisible] = useState(false);

  // useEffect(() => {
  //   setIsTextVisible(true);
  // }, []);

  return (
    <div className="hero-container">
      <Corousel/>
      {/* <div className="hero-content">
        <h1 className={`title ${isTextVisible ? "animate-text" : ""}`}>
          <strong>
            Perusahaan Layanan dan Eksekusi Terpadu
          </strong>
        </h1>
        <p className="subtitle">
          Satu Atap Pertama di Indonesia
        </p>
        <p className="description">
          Memberdayakan pembelian, penjualan, dan layanan Anda
        </p>
        <Link to="/productlist">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
      <div className="hero-image-container">
        <img src={HeroImage} alt="" className="hero-image" />
      </div> */}
    </div>
  );
}
