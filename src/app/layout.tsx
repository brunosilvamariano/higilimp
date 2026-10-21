import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import homeImage from '@/assets/images/zelora/sala-com-sofa.webp';
import { archivo, interTight } from '@/styles/fonts';
import '@/components/zelora/preview.css';

const title = 'Zelora Higienização | Estofados em Joinville';
const description =
  'Higienização profissional de sofás, colchões e estofados para empresas e residências em Joinville e região.';
const shareImage = {
  url: homeImage.src,
  width: homeImage.width,
  height: homeImage.height,
  alt: 'Sala com sofá azul — imagem ilustrativa da Zelora Higienização',
  type: 'image/webp',
};

export const viewport: Viewport = { themeColor: '#2d78e4' };
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title,
  description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Zelora',
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
