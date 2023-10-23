import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {NextUIProvider} from "@nextui-org/react";
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '500', '900'] })

export default function App({ Component, pageProps }: AppProps) {
  return(    
    <NextUIProvider className={roboto.className}>
      <head>
        <link rel='shortcut icon' href='/https://rumoaoestrelato.vercel.app/favicon.ico' type='image/x-icon' />
      </head>
      <Component {...pageProps} />
    </NextUIProvider>    
  ) 
  
}
