import localFont from 'next/font/local';

export const bebasNeue = localFont({
  src: '../assets/fonts/bebas-neue/BebasNeue-Regular.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '400',
});

export const dmSans = localFont({
  src: '../assets/fonts/dm-sans/DMSans-Variable.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '100 1000',
});

export const poppins = localFont({
  src: [
    {
      path: '../assets/fonts/poppins/Poppins-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-poppins',
  // Hero/header use Bebas Neue and DM Sans; Poppins loads when content needs it.
  preload: false,
  display: 'swap',
});

export const archivo = localFont({
  src: '../assets/fonts/archivo/Archivo-Variable.ttf',
  variable: '--font-archivo',
  display: 'swap',
  weight: '100 900',
});
export const interTight = localFont({
  src: '../assets/fonts/inter-tight/InterTight-Variable.ttf',
  variable: '--font-inter-tight',
  display: 'swap',
  weight: '100 900',
});
