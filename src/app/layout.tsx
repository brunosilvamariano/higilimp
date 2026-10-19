import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { archivo, interTight } from '@/styles/fonts';
import '@/components/higilimp/preview.css';

export const viewport: Viewport = { themeColor: '#2d78e4' };
export const metadata: Metadata = {
  title: 'HigiLimp | Higienização de estofados em Joinville',
  description:
    'Higienização profissional de sofás, colchões e estofados para empresas e residências em Joinville e região.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
