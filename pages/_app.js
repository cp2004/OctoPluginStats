import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import {makeTheme} from "../components/theme";
import {useMediaQuery} from "@mui/material";

const clientSideEmotionCache = createCache({ key: 'css'});

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const darkTheme = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = makeTheme(darkTheme)

    return (
        <CacheProvider value={emotionCache}>
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
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
