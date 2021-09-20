import {createTheme} from "@mui/material/styles"

const systemFont = [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
];

export const makeTheme = (dark) => createTheme({
    palette: {
        mode: dark ? "dark" : "light",
        primary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
        },
        secondary: {
            light: '#718792',
            main: '#455a64',
            dark: '#1c313a',
            contrastText: '#000',
        },
    },
    typography: {
        fontFamily: ['"Exo 2"', ...systemFont].join(','),
    }
})

