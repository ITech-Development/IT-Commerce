import React from 'react'
// import Navbar from '../../components/navbar'
import HeroSection from '../../components/sections/hero'
import CommitQuote from '../../components/sections/commited'
import ProductSelected from '../../components/sections/productSelect'
import Riset from '../../components/sections/Riset'
import AdminProf from '../../components/sections/adminProf'
import Quote from '../../components/sections/quote'
// import ComeRegis from '../../components/sections/ComeRegis'
// import Service from '../../components/sections/services/cardItems'
import Footer from '../../components/footer'

function index() {
  return (
    <>
    <div style={{position: 'relative', top: '60px'}}>

        {/* <Navbar/> */}
        <HeroSection/>
        <CommitQuote/>
        <ProductSelected />
        <Riset/>
        <AdminProf/>
        <Quote/>
        {/* <ComeRegis/> */}
        {/* <Service/> */}
        <Footer/>
    </div>
    </>
  )
}

export default index