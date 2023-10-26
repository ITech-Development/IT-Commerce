import React from "react";
import "./aboutUs.css";
import PeopleBot from "../../assets/mascotmes.gif";
import Jusman from '../../assets/jusman.png'
import Kenji from '../../assets/kenji.png'
import Evans from '../../assets/evans.png'
import Celine from '../../assets/celine.png'

const AboutUs = () => {
  return (
    <div>
      <section className="about">
        <h1>Tentang Kami</h1>
        {/* <p style={{ fontWeight: "bold" }}>
          
        </p> */}
        <div className="about-info">
          <div className="about-img">
            <img src={PeopleBot} alt="Geeksforgeeks" />
          </div>
          <div className="containerContent">
            <div>
              <h3>Warisan Kami:</h3>
              <p className="content">
                Sebagai pionir dalam teknologi otomotif, Indo Teknik telah
                membangun reputasi terkemuka di sektor ini. Kami mengkhususkan
                diri dalam suku cadang diesel, baterai otomotif, dan beragam
                aksesori mobil. Dengan menggabungkan teknologi canggih dan
                kebutuhan yang terus berkembang dalam industri otomotif modern,
                kami terus menjadi penyelenggara solusi terdepan.
              </p>
            </div>
            <div>
              <h3>Keluarga kami:</h3>
              <p className="content">
                Sebagai perusahaan induk dari dua perusahaan terkemuka, yaitu
                ITech Persada Nusantara dan Crowne, pengaruh kami tidak terbatas
                pada satu entitas saja. Anak perusahaan yang terhormat ini, yang
                berpegang pada nilai-nilai inti Indo Teknik, semakin memperkuat
                misi dan jangkauan bersama kami dalam industri ini.
              </p>
            </div>
            <div>
              <h3>Bengkel & Distribusi:</h3>
              <p className="content">
                Fasilitas bengkel kami yang canggih adalah pusat inovasi, tempat
                keahlian bertemu semangat. Dipimpin oleh tim profesional yang
                berdedikasi, kami memastikan bahwa setiap produk dan layanan
                memenuhi standar kualitas yang ketat sesuai dengan standar yang
                kami tetapkan. Jaringan distribusi yang luas adalah bukti
                komitmen kami untuk menjadikan produk kami dapat dijangkau oleh
                klien, di mana pun mereka berada.
              </p>
            </div>
            <div>
              <h3>Komitmen kita:</h3>
              <p className="content">
                Kepuasan pelanggan adalah inti dari Indo Teknik. Kami membangun
                hubungan jangka panjang berdasarkan kepercayaan, transparansi,
                dan saling menghormati. Semangat kami diperkuat oleh banyak
                cerita kepuasan pelanggan yang merasakan dampak positif Indo
                Teknik.
              </p>
            </div>
            <div>
              <h3>Membentuk Masa Depan:</h3>
              <p className="content">
                Di Indo Teknik, visi kami melampaui sekadar bisnis. Kami
                berkomitmen untuk memajukan teknologi otomotif demi masa depan
                yang berkelanjutan. Melalui penelitian, inovasi, dan upaya tak
                kenal lelah untuk mencapai keunggulan, kami bertujuan menjadi
                pionir dalam mendorong perubahan dalam industri otomotif.
              </p>
            </div>
            <div>
              <h3>Bergabunglah dengan Perjalanan Kami:</h3>
              <p className="content">
                Kami terus memperluas wawasan dan mengubah wajah industri
                otomotif. Kami mengundang Anda untuk bergabung dalam perjalanan
                kami. Di Indo Teknik, Anda bukan sekadar pelanggan; Anda adalah
                bagian dari keluarga kami yang terus tumbuh, bergerak menuju
                masa depan otomotif yang lebih cerah, efisien, dan berteknologi
                maju.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <h1>Meet Our Team</h1>
        <div className="team-cards">
          {/* Cards here */}
          {/* Card 1 */}
          <div className="card">
            <div className="card-img">
              <img
                // src="https://media.geeksforgeeks.org/wp-content/uploads/20230824122630/business-office-business-woman-professional.jpg"
                src={Jusman}
                alt="User 1"
              />
            </div>
            <div className="card-info">
              <h2 className="card-name">Jusman</h2>
              <p className="card-role">CEO</p>
              {/* <p className="card-email">jane@example.com</p> */}
              <a
                href="/"
                target="blank"
              >
                <button className="buttonAbout">LinkedIn</button>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <div className="card-img">
              <img
                // src="https://media.geeksforgeeks.org/wp-content/uploads/20230822183347/man-portrait-businessman-male.jpg"
                src={Kenji}
                alt="User 2"
              />
            </div>
            <div className="card-info">
              <h2 className="card-name">Kenji</h2>
              <p className="card-role">CTO</p>
              {/* <p className="card-email">Miller@example.com</p> */}
              <a
                href="/"
                target="blank"
              >
                <button className="buttonAbout">LinkedIn</button>
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img
                // src="https://media.geeksforgeeks.org/wp-content/uploads/20230824122630/business-office-business-woman-professional.jpg"
                src={Celine}
                alt="User 2"
              />
            </div>
            <div className="card-info">
              <h2 className="card-name">Celine</h2>
              <p className="card-role">CMO</p>
              {/* <p className="card-email">Miller@example.com</p> */}
              <a
                href="/"
                target="blank"
              >
                <button className="buttonAbout">LinkedIn</button>
              </a>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card">
            <div className="card-img">
              <img
                // src="https://media.geeksforgeeks.org/wp-content/uploads/20230822183347/man-portrait-businessman-male.jpg"
                src={Evans}
                alt="User 3"
              />
            </div>
            <div className="card-info">
              <h2 className="card-name">Evans Moris</h2>
              <p className="card-role">Head of Technology</p>
              <a
                href="https://www.linkedin.com/in/evansmoris21/"
                target="blank"
              >
                <button className="buttonAbout">LinkedIn</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
