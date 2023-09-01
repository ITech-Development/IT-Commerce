import React from "react";

const CompanyDescription = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h3>Description</h3>
        <p>
          Indo Teknik is a distributor and workshop of various reputable diesel
          spare parts in Indonesia. Conquering the market since 10 November
          2005, Indo Teknik visioned in providing the best service for their
          customers by utilizing the best machinery and highly qualified,
          experienced, and professional mechanics. Located on Jalan Riau-Ujung
          No.898-904, Pekanbaru, Riau, Indonesia, Indo Teknik thrive to give the
          best services and products for their customers.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1520px",
    margin: "auto",
    border: "1px solid #FFF0F0",
    borderRadius: "5px",
    marginBottom: "30px",
    marginTop: "30px",
  },
  content: {
    padding: "10px 30px",
    backgroundColor: "#FFF0F0",
    /* Add more styles for better text wrapping and overall presentation */
  },
};

export default CompanyDescription;
