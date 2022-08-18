import styled from 'styled-components';
import {
  compose,
  palette,
  typography,
  display,
  flexbox,
  spacing,
  width,
  borders,
} from '@material-ui/system';

export const Box = styled('div')(
  compose(width, display, flexbox, spacing, palette, typography, borders),
);
