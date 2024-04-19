import { Roboto } from 'next/font/google';
import { Noto_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
export const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin-ext'],
  display: 'swap',
});

const getTheme = (language: string = 'en') => {
  console.log('language>>>>', language);
  return createTheme({
    direction: language === 'ar' || language === 'fa' ? 'rtl' : 'ltr',
    palette: {
      primary: {
        main: '#e41f3b',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff8201',
        contrastText: '#fff',
      },
      grey: {
        50: '#f9fafb',
        100: '#f4f6f8',
        200: '#e3e7eb',
        300: '#d2d6db',
        400: '#9fa6b2',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#252f3f',
        900: '#161e2e',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#f4f6f8',
      },
      text: {
        primary: '#12161b',
        secondary: '#66788a',
      },
      companyBlue: {
        main: '#040035',
        contrastText: '#fff',
      },
      CompanyWhite: {
        main: 'Whiteout Color',
        contrastText: '#000',
      },
    },
    typography: {
      fontFamily: language === 'ar' || language === 'fa' ? notoSans.style.fontFamily : roboto.style.fontFamily,
    },
  });
};

export default getTheme;
