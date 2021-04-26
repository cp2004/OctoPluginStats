import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {createMuiTheme as createTheme, ThemeProvider} from '@material-ui/core/styles';  // This will be renamed in upcoming MUI
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import useLocalStorage from "../hooks/useLocalStorage";
import {useState} from "react";

export const cache = createCache({ key: 'css', prepend: true });

const makeTheme = (dark) => {
    return createTheme({
        palette: {
            mode: dark ? "dark" : "light"
        }
    })
}

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const [darkTheme, setDarkTheme] = useState(false)
    const [localDarkTheme, setLocalDarkTheme] = useLocalStorage("darkTheme", false)
    const theme = makeTheme(darkTheme)
    console.log(theme)

    React.useEffect(() => {
        setDarkTheme(localDarkTheme)
    }, [setDarkTheme, localDarkTheme])

    const toggleDarkTheme = () => setDarkTheme(prevState => {
        setLocalDarkTheme(!prevState)
        return !prevState
    })

    // Add theming stuff to pageProps
    pageProps.darkTheme = darkTheme
    pageProps.toggleDarkTheme = toggleDarkTheme

    return (
        <CacheProvider value={cache}>
            <Head>
                <title>OctoPluginStats</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
