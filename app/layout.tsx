import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { weddingConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `${weddingConfig.groom.nickname} & ${weddingConfig.bride.nickname} — ${weddingConfig.hashtag}`,
  description: `Undangan Pernikahan ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
  openGraph: {
    title: `${weddingConfig.groom.nickname} & ${weddingConfig.bride.nickname}`,
    description: `Undangan Pernikahan — ${weddingConfig.hashtag}`,
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Serif+Display:ital@0;1&family=Josefin+Sans:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                fontFamily: 'Josefin Sans, sans-serif',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
