import './globals.css'
import { Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

import Providers from './providers'

export const metadata = {
  title: 'KaziPool',
  description: 'Find jobs and talents',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
