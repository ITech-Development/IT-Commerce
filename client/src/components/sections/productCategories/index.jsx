import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './ProductCategories.css'; // Import your CSS file

function ProductCategoryCard({ to, title }) {
  const cardAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: async next => {
      while (true) {
        await next({ transform: 'scale(1.05)' });
        await next({ transform: 'scale(1)' });
      }
    },
  });

  return (
    <animated.div className="category-card" style={cardAnimation}>
      <Link to={to}>
        <h1>{title}</h1>
      </Link>
    </animated.div>
  );
}

function ProductCategories() {
  return (
    <div className="category-container">
      <div className="category-section">
        <h1>Kategori<br />Pilihan<br />Terlaris</h1>
        <Link to="/productlist">
        <button className="view-all-button">Lihat Semua Produk</button>
        </Link>
      </div>
      <div className="category-sectionCategories">
        <ProductCategoryCard to="/nozzle" title="Nozzle" />
        <ProductCategoryCard to="/delivery-valve" title="Delivery Valve" />
        <ProductCategoryCard to="/element" title="Element" />
        <ProductCategoryCard to="/ve-pump" title="VE Pump" />
        <ProductCategoryCard to="/ve-pump-parts" title="VE Pump Parts" />
        <ProductCategoryCard to="/head-rotor" title="Head Rotor" />
      </div>
    </div>
  );
}

export default ProductCategories;
