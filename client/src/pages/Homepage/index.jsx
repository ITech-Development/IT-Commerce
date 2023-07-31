import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import HeroSection from '../../components/sections/hero';
import CommitQuote from '../../components/sections/commited';
import ProductSelected from '../../components/sections/productSelect';
import Riset from '../../components/sections/Riset';
import AdminProf from '../../components/sections/adminProf';
import Quote from '../../components/sections/quote';
import Footer from '../../components/footer';
import ClaimVoucher from '../../assets/claimVoucher.jpg'
import { Link } from 'react-router-dom';



function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect to open the modal on component mount
  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <div style={{ position: 'relative', top: '60px' }}>
        {/* <Navbar/> */}
        <HeroSection />
        <CommitQuote />
        <ProductSelected onClick={openModal} /> {/* Added onClick event */}
        <Riset />
        <AdminProf />
        <Quote />
        {/* <ComeRegis/> */}
        {/* <Service/> */}
        <Footer />
      </div>

      {/* Modal for Image */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Product Image"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            maxWidth: '300px', // Adjust the width of the modal here
            margin: 'auto',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>
          <img
            src={ClaimVoucher}
            alt="Product"
            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
          />
        </div>
        <h2 style={{ textAlign: 'center' }}>Belanja Sekarang Untuk Bisa Mendapatkan Diskon Spesial!</h2>
        <Link to='/productlist'>
        <button style={{ display: 'block', margin: 'auto', marginTop: '20px' }} onClick={closeModal}>
          Ambil Voucher
        </button>
        </Link>
      </Modal>
    </>
  );
}

export default Index;