import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import homeImage from '@/assets/images/higilimp/proprietario.webp';
import { archivo, interTight } from '@/styles/fonts';
import '@/components/higilimp/preview.css';

const title = 'HigiLimp | Higienização de estofados em Joinville';
const description =
  'Higienização profissional de sofás, colchões e estofados para empresas e residências em Joinville e região.';
const shareImage = {
  url: homeImage.src,
  width: homeImage.width,
  height: homeImage.height,
  alt: 'Proprietário da HigiLimp, de uniforme e braços cruzados',
  type: 'image/webp',
};

export const viewport: Viewport = { themeColor: '#2d78e4' };
export const metadata: Metadata = {
  metadataBase: new URL('https://higilimp.vercel.app/'),
  title,
  description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'HigiLimp',
    url: '/',
    title,
    description,
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [shareImage],
  },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
