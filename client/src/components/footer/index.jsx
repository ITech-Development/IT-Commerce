import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

// Styled components for the Footer
const FooterContainer = styled.footer`
  background-color: #A1F9FF;
  color: #000000;
  padding: 20px;
  text-align: center;
  margin-top: 30px;
`;

const FooterText = styled.p`
  margin: 0;
`;

const SocialIconsContainer = styled.div`
  margin-top: 10px;
`;

const SocialIcon = styled.a`
  display: inline-block;
  margin: 0 5px;
  font-size: 24px;
  color: #000000;
  transition: color 0.2s;

  &:hover {
    color: #ffcc00;
  }
`;

// Footer component
const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; 2023 PT. ITech Persada Nusantara. All rights reserved.
      </FooterText>
      <SocialIconsContainer>
        <SocialIcon href="#" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <FontAwesomeIcon icon={faFacebookF} />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </SocialIcon>
      </SocialIconsContainer>
    </FooterContainer>
  );
};

export default Footer;
