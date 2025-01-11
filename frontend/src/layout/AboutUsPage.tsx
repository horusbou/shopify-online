import React from 'react';
import styled from 'styled-components';

const AboutUsWrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: hsl(var(--white));
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2.4rem;
    font-weight: bold;
    color: hsl(var(--very-dark-blue));
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.6rem;
    line-height: 1.8;
    color: hsl(var(--dark-grayish-blue));
    margin-bottom: 1.5rem;
  }

  img {
    width: 100%;
    border-radius: 0.8rem;
    margin-bottom: 2rem;
  }

  .team-section {
    margin-top: 2rem;
  }

  .team-member {
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }
`;

const AboutUsPage: React.FC = () => {
  return (
    <AboutUsWrapper>
      <h2>About Us</h2>
      <p>
        Welcome to <strong>Horus&Him</strong>, your one-stop solution for all your online shopping needs. 
        Our mission is to deliver the best quality products and an exceptional shopping experience.
      </p>

      <p>
        Our journey began with a passion for creating a seamless platform where customers can explore 
        and purchase products they love. Our values are rooted in customer satisfaction, innovation, 
        and excellence.
      </p>

      <div className="team-section">
        <h3>Meet Our Team</h3>
        <div className="team-member">
          <strong>John Doe</strong> - CEO & Founder
        </div>
        <div className="team-member">
          <strong>Jane Smith</strong> - Head of Product
        </div>
        <div className="team-member">
          <strong>Sam Lee</strong> - Lead Developer
        </div>
        <div className="team-member">
          <strong>Sara Connor</strong> - Marketing Specialist
        </div>
      </div>

      <p>
        Thank you for choosing Horus&Him. We look forward to serving you and making your shopping journey memorable.
      </p>
    </AboutUsWrapper>
  );
};

export default AboutUsPage;
