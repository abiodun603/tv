import styled from 'styled-components';
import {
  compose,
  palette,
  typography,
  display,
  flexbox,
  spacing,
  sizing,
  borders,
} from '@material-ui/system';

export const Box = styled('div')(
  compose(sizing, display, flexbox, spacing, palette, typography, borders),
);
