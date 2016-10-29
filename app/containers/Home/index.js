import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Home = () => {
  return (
    <Title>Welcome to the home page!</Title>
  );
};

export default Home;