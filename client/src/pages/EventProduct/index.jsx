// EventProductPage.js
import React from 'react';
import { useAddEventProductMutation, useGetAllEventProductsQuery } from '../../features/eventProduct/apiEventProducts';

const EventProductPage = () => {
  const { data: eventProducts, error, isLoading } = useGetAllEventProductsQuery();
  const [addEventProduct] = useAddEventProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Event and Product Page</h1>
      {eventProducts.map((eventProduct) => (
        <div key={eventProduct.id}>
          <h2>{eventProduct.events.name}</h2>
          <p>{eventProduct.events.description}</p>
          <p>Start Date: {eventProduct.events.startDate}</p>
          <p>End Date: {eventProduct.events.endDate}</p>
          <img src={eventProduct.eventProducts.image} alt={eventProduct.eventProducts.name} width='200px'/>
          <p>{eventProduct.eventProducts.description}</p>
          <p>Minimum Order: {eventProduct.eventProducts.minimumOrder}</p>
          <p>Unit Price: {eventProduct.eventProducts.unitPrice}</p>
          <p>Stock: {eventProduct.eventProducts.stock}</p>
        </div>
      ))}

      {/* Example of adding a new event product */}
      <button
        onClick={() => {
          addEventProduct({/* your data here */}).unwrap(); // Make sure to pass the required data
        }}
      >
        Add Event Product
      </button>
    </div>
  );
};

export default EventProductPage;
