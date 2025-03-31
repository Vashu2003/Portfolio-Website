import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProvider from './providers/client'
import Header from '../components/Header'
import { ThemeProvider } from '../components/theme-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Vashu Singh | Portfolio',
  description: 'Portfolio website of Vashu Singh',
  icons: {
    icon: '/assets/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ClientProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  )
}