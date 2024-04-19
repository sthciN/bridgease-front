import getTheme from '../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState, useEffect, use } from 'react';
import Head from 'next/head';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AppProps } from 'next/app';
import { useSelector } from 'react-redux';
import { get } from 'http';
import { RootState } from './store/store';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { notoSans } from '../src/theme';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: require('../locales/en/translation.json'),
            },
            fa: {
                translation: require('../locales/fa/translation.json'),
            },
            tr: {
                translation: require('../locales/tr/translation.json'),
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default function MyAppInner(props: AppProps) {
    const { Component, pageProps } = props;
    const { i18n } = useTranslation();
    const language = useSelector((state: RootState) => state.language.language);
    const [theme, setTheme] = useState(getTheme());
    const [rtl, setRtl] = useState(false);

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en';
        console.log('storedLanguage', storedLanguage)
        setTheme(getTheme(storedLanguage));
        i18n.changeLanguage(storedLanguage);
        if (storedLanguage == 'ar' || storedLanguage == 'fa') {
            setRtl(true);
        }
    }, [language]);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            {rtl ? (
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component className={notoSans.className} {...pageProps} />
                    </ThemeProvider>
                </CacheProvider>
            ) : (
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            )}
        </>
    );
}