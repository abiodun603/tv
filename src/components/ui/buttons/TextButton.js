import React from 'react';
import { useTheme } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  color: ${(props) => props.color};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  border: none;
  color: ${(props) => props.color};
  background-color: inherit;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
`;

const Image = styled.img`
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  border-radius: 4px;
  margin-left: 1em;
  width: 2em;
`;

export const TextButton = (props) => {
  const theme = useTheme();
  const { isHidden, onClick, children, imageSrc, helperText } = props;
  if (isHidden) {
    return <div />;
  }

  return (
    <Container>
      {!!helperText && (
        <Text color={theme.palette.grey.grey60}>{helperText}&nbsp;</Text>
      )}
      <Button onClick={onClick} color={theme.palette.primary.main}>
        {children}
        {!!imageSrc && (
          <Image
            src={imageSrc}
            color={theme.palette.primary.main}
            alt="isabitv_icon"
          />
        )}
      </Button>
    </Container>
  );
};
