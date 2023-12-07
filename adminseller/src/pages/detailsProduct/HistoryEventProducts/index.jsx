import React from 'react'
import styled from 'styled-components';
import { useDeleteEventProductMutation } from '../../../features/eventProduct/apiEventProducts';


function HistoryEventProducts({ eventProducts, product }) {

  const [deleteProductFromHistory] = useDeleteEventProductMutation()

  const handlerDelete = (id) => {
    deleteProductFromHistory(id)
  }
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
    <div>
      <h3>Riwayat penambahan event produk</h3>
      <HistoryOfEventProducts>
        {filteredProducts.map((history) => (
          <div key={history.eventProducts.id}>
            <hr />
            {/* Add additional information as needed */}
            <p>{history.events.name}</p>
            <p><b>{history.eventProducts.name}</b></p>
            <p>Ditambahkan {new Date(history.createdAt).toLocaleDateString('id-Id')}</p>
            <button onClick={() => handlerDelete(history.id)}>
              Hapus
            </button>
            <hr />
          </div>
        ))}
      </HistoryOfEventProducts>
    </div>
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