import { Roboto_Condensed, Noto_Sans_Symbols_2 } from 'next/font/google';

export const robotoCondensed = Roboto_Condensed({
  weight: ['300', '700'],
  display: 'swap',
  preload: false
});

export const notoSansSymbols2 = Noto_Sans_Symbols_2({
  weight: ['400'],
  display: 'auto',
  preload: false
});
