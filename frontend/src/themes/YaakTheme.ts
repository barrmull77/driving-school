import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Theme, ThemeOptions } from '@mui/material/styles';

// Create a theme instance.
const theme = {
    typography: {
        fontFamily: [
            'Inter', // Make sure the name matches the Google Fonts name
            'sans-serif', // You can specify additional fallback fonts
        ].join(','),
        h2: {
            fontWeight: '700',
            fontSize: '1.75rem',
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
    }
};

export default createTheme(theme);