import styled from 'styled-components';

const heightProp = prop => {
  if(typeof prop === 'number') return `${prop}px`;
  return 'auto';
};

const Wrapper = styled.section`
  background: rgba(33,33,33,1.0);
  min-height: ${props => heightProp(props.height) }
`;

export default Wrapper;