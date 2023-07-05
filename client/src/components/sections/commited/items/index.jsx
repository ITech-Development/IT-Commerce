import React from "react";
import Quality from '../../../../assets/highQuality.png'
import Cerdas from '../../../../assets/cerdas.png'
import Dukungan from '../../../../assets/dukungan.png'
import Response from '../../../../assets/response.png'
import Support from '../../../../assets/support24.png'
import TransactionPrac from '../../../../assets/transactionpraktis.png'
import '../commitStyle.css'

export default function index() {
  return (
    <>
    
    <div className="commited">
      <div className="card-items">
        <img src={Quality} alt="" style={{width :'80px', margin: 'auto'}}/>
        <h3>Kualitas Tinggi</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
        </p>
      </div>
      <div className="card-items">
        <img src={Support} alt="" style={{width :'80px', margin: 'auto'}}/>
        <h3>bantuan 24/7</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
        </p>
      </div>
      <div className="card-items">
        <img src={TransactionPrac} alt="" style={{width :'80px', margin: 'auto'}}/>
        <h3>Transaksi praktis</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
        </p>
      </div>
    </div>
    <div className="commited">
      <div className="card-items">
        <img src={Cerdas} alt="" style={{width :'80px', margin: 'auto'}}/>
        <h3>Pengadaan yang cerdas</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
        </p>
      </div>
      <div className="card-items">
        <img src={Response} alt="" style={{width :'80px', margin: 'auto'}}/>
        <h3>Respon cepat</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
        </p>
      </div>
      <div className="card-items">
        <img src={Dukungan} alt="" style={{width :'80px', margin: 'auto'}}/>
        <h3>Dukungan teknologi</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor
        </p>
      </div>
    </div>
    </>
  );
}
