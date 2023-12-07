import React from 'react'
import styled from 'styled-components';

function HistoryEventProducts({ eventProducts, product }) {
  // Filter and sort the eventProducts
  const filteredProducts = eventProducts
    ?.filter((eventProduct) => eventProduct.productId === product.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Check if the filtered array is empty
  if (!filteredProducts || filteredProducts.length === 0) {
    return <HistoryOfEventProducts>Belum ada produk yang ditambahkan</HistoryOfEventProducts>;
  }

  // Render the list of eventProducts
  return (
    <HistoryOfEventProducts>
      <h3>Riwayat penambahan event produk</h3>
      {filteredProducts.map((relatedProduct) => (
        <div key={relatedProduct.eventProducts.id}>
          <hr />
          {/* Add additional information as needed */}
          <p>{relatedProduct.events.name}</p>
          <p>Ditambahkan {new Date(relatedProduct.createdAt).toLocaleDateString('id-Id')}</p>
          <hr />
        </div>
      ))}
    </HistoryOfEventProducts>
  );
}



const HistoryOfEventProducts = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px; /* Set the maximum height according to your design */
  overflow-y: auto; /* Enable vertical scrolling */
  margin-top: 20px;
`;


export default HistoryEventProducts