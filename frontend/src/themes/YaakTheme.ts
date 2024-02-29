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
        body2: {
            fontWeight: '500',
            fontSize: '0.75rem',
            lineHeight: '1rem'
        }
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
            main: '#00a751',
            light: '#eaffe9'
        },
        secondary: {
            main: '#e3e8e5',
            light: '#f8f9ff'
        },
        text: {
            primary: '#0c0d0d',
            secondary: '#7d8287'
        },
        yellowChip: {
            main: '#e5b300',
            light: '#fffae5'
        }
    },
};

export default createTheme(theme);