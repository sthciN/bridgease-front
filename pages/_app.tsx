import React from 'react';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import MyAppInner from '../src/App';


export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <AppCacheProvider {...props}>
        <MyAppInner Component={Component} pageProps={pageProps} />
      </AppCacheProvider>
    </Provider>
  );
}
