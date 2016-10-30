import React from 'react';
import Title from 'components/Title';
import Wrapper from 'components/Wrapper';

/**
 * Home page container component,
 * Used in our app as the IndexRoute
 * @example
 * <Home />
 */
const Home = () => {
  return (
    <Wrapper>
      <Title>Welcome to the home page!</Title>
    </Wrapper>
  );
};

export default Home;