import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Theme, ThemeOptions } from '@mui/material/styles';
import style from './style.less'

// Create a theme instance.
const theme: ThemeOptions = {
    typography: {
        fontFamily: [
            'Inter', // Make sure the name matches the Google Fonts name
            'sans-serif', // You can specify additional fallback fonts
        ].join(','),
        h2: {
            fontWeight: '700',
            fontSize: '1.75rem',
        },
        h3: {
            fontWeight: '500',
            fontSize: '1rem',
            lineHeight: '1.4rem'
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 960,
            lg: 1280,
            xl: 1768,
        },
    },
    palette: {
        primary: {
            light: '#eaffe9',
            main: '#00a751'
        },
        secondary: {
          main: '#e3e8e5',
        },
        text: {
            primary: '#0c0d0d',
            secondary: '#7d8287'
        }
    },
};

export default createTheme(theme);