import { Instrument_Sans, JetBrains_Mono, Fraunces } from 'next/font/google'
import MotionProvider from './Components/MotionProvider'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  weight: ['400', '500', '600', '700']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500']
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
  display: 'swap'
})

const TITLE = 'Amritesh Dasari | Software Engineer'
const DESCRIPTION =
  'Software engineer building reliable backend services, data pipelines, and distributed systems — from enterprise AI chatbots to fault-tolerant clusters.'

export const metadata = {
  metadataBase: new URL('https://amriteshdasari.github.io'),
  title: { default: TITLE, template: '%s | Amritesh Dasari' },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Amritesh Dasari',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohan Amritesh Dasari — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
}

export const viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={[
        instrumentSans.variable,
        jetbrainsMono.variable,
        fraunces.variable,
      ].join(' ')}
    >
      <body className="font-sans bg-background-primary text-text-secondary antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
