import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import {useMedia} from "../hooks/useMedia";
import {makeTheme} from "../components/theme";

export const cache = createCache({ key: 'css', prepend: true });

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        // Media queries go here
    }, []);

    const darkTheme = true // useMedia(["(prefers-color-scheme: dark)"], [true], false);

    const theme = makeTheme(darkTheme)

    return (
        <CacheProvider value={cache}>
            <Head>
                <title>OctoPluginStats</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </StyledEngineProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
