import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#2dbd58',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    info: {
      main: '#2B3331',
    },
    grey: {
      default: '#BFC1C1',
      grey10: 'RGBA(43, 51, 49, 0.1)',
      grey30: 'RGBA(43, 51, 49, 0.3)',
      grey50: 'RGBA(43, 51, 49, 0.05)',
      grey60: 'RGBA(43, 51, 49, 0.6)',
      white60: 'RGBA(255, 255, 255, 0.6)',
    },
  },
});

export default theme;
