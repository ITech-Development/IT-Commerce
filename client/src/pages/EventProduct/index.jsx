// EventProductPage.js
import React, { useEffect, useState } from 'react';
import { useGetAllEventProductsQuery } from '../../features/eventProduct/apiEventProducts';
import { Link } from "react-router-dom";

const EventProductPage = () => {
  const { data: eventProducts, error: eventError, isLoading: eventIsLoading } = useGetAllEventProductsQuery();
  const uniqueEventNames = [...new Set(eventProducts?.map((eventProduct) => eventProduct.events.name))];

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [weeklyTimeRemaining, setWeeklyTimeRemaining] = useState(calculateWeeklyTimeRemaining());
  const [monthlyTimeRemaining, setMonthlyTimeRemaining] = useState(calculateMonthlyTimeRemaining());

  function calculateTimeRemaining() {
    const today = new Date();
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0); // End of today
    const timeDiff = endOfDay - today;
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  function calculateWeeklyTimeRemaining() {
    const today = new Date();
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()) + 1, 0, 0, 0, 0); // End of the current week
    const timeDiff = endOfWeek - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }


  function calculateMonthlyTimeRemaining() {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 0, 0, 0, 0); // End of the current month
    const timeDiff = endOfMonth - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMonthlyTimeRemaining(calculateMonthlyTimeRemaining());
    }, 1000);

    // Hentikan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setWeeklyTimeRemaining(calculateWeeklyTimeRemaining());
    }, 1000);

    // Hentikan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Hentikan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);


  const [selectedTab, setSelectedTab] = useState('Today');

  // Filter event products based on selected tab 
  const filteredEventProducts = eventProducts?.filter((eventProduct) => {
    const isTodayTab = selectedTab === 'Today';
    const isWeeklyTab = selectedTab === 'Weekly';
    const isMonthlyTab = selectedTab === 'Monthly';
    const isMatchingEvent = eventProduct.events.name === selectedTab;

    if (isTodayTab) {
      // Check if createdAt date is today
      const today = new Date().toDateString();
      const eventProductDate = new Date(eventProduct.createdAt).toDateString();
      return isTodayTab && eventProductDate === today && eventProduct.events.name === 'Today';
    }

    if (isWeeklyTab) {
      // Check if createdAt date is within the current week
      const today = new Date();
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);

      const eventProductDate = new Date(eventProduct.createdAt);
      return isWeeklyTab && eventProductDate >= startOfWeek && eventProductDate <= endOfWeek && eventProduct.events.name === 'Weekly';
    }

    if (isMonthlyTab) {
      // Check if createdAt date is within the current month
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const eventProductDate = new Date(eventProduct.createdAt);
      return isMonthlyTab && eventProductDate >= startOfMonth && eventProductDate <= endOfMonth && eventProduct.events.name === 'Monthly';
    }

    return isMatchingEvent 
  });

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  if (eventIsLoading ) {
    return <div>Loading...</div>;
  }

  if (eventError ) {
    return (
      <div>
        <div>Error: {eventError?.message }</div>
        {/* Add a button or link to retry the operation */}

      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <h1>Event Produk</h1>
      <p>
        {selectedTab === 'Today' && (
          <>
            Berakhir dalam: {timeRemaining.hours} jam, {timeRemaining.minutes} menit, {timeRemaining.seconds} detik
          </>
        )}
        {selectedTab === 'Weekly' && (
          <>
            Berakhir dalam: {weeklyTimeRemaining.days} hari, {weeklyTimeRemaining.hours} jam, {weeklyTimeRemaining.minutes} menit, {weeklyTimeRemaining.seconds} detik
          </>
        )}
        {selectedTab === 'Monthly' && (
          <>
            Berakhir dalam: {monthlyTimeRemaining.days} hari, {monthlyTimeRemaining.hours} jam, {monthlyTimeRemaining.minutes} menit, {monthlyTimeRemaining.seconds} detik
          </>
        )}
      </p>

      {/* Render event tabs */}
      <div>
        {uniqueEventNames.map((eventName) => (
          <button
            key={eventName}
            onClick={() => handleTabClick(eventName)}
            className={selectedTab === eventName ? 'selected-tab' : ''}
          >
            {eventName}
          </button>
        ))}
      </div>


      {/* Render content based on selected tab */}
      {filteredEventProducts.map((eventProduct) => (
        <div key={eventProduct.id}>
          {/* ... (render event product details as before) */}
          <h2>{eventProduct.events.name}</h2>
          <Link to={`${eventProduct.eventProducts.id}`}>
            <p>{eventProduct.eventProducts.name}</p>
          </Link>
          <p>{eventProduct.events.description}</p>
          <Link to={`${eventProduct.eventProducts.id}`}>
            <img src={eventProduct.eventProducts.image} alt={eventProduct.eventProducts.name} width='200px' />
          </Link>
          <p>{eventProduct.eventProducts.description}</p>
          <p>Minimum Order: {eventProduct.eventProducts.minimumOrder}</p>
          <p>Unit Price: Rp.{eventProduct.eventProducts.unitPrice}</p>
          <p>Stock: {eventProduct.eventProducts.stock}</p>
          <p>Category: {eventProduct.eventProducts.categories?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default EventProductPage;
