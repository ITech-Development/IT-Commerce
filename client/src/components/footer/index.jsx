import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <p>© {new Date().getFullYear()} Powered by PT. Itech Persada Nusantara. All rights reserved.</p>
    </div>
  );
};

const styles = {
  footer: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
  },
};

export default Footer;
