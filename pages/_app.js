import '../styles/globals.css'

import { Poppins, Great_Vibes } from 'next/font/google'

// Carrega as fontes
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
})

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable} ${greatVibes.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
