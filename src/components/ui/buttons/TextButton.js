import React from 'react';
import styled, { withTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  color: ${(props) => props.theme.palette.grey.grey60};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  border: none;
  color: ${(props) => props.theme.palette.primary.main};
  background-color: inherit;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
`;

const Image = styled.img`
  background-color: ${(props) => props.theme.palette.primary.main};
  border-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 4px;
  margin-left: 1em;
  width: 2em;
`;

export const TextButton = (props) => {
  const { isHidden, onClick, children, imageSrc, helperText } = props;
  if (isHidden) {
    return <div />;
  }

  return (
    <Container>
      {!!helperText && <Text>{helperText}&nbsp;</Text>}
      <Button onClick={onClick}>
        {children}
        {!!imageSrc && <Image src={imageSrc} alt="isabitv_icon" />}
      </Button>
    </Container>
  );
};
