import { useState } from 'react'
import Image from 'next/image'
import { Roboto } from 'next/font/google'
import img01 from '../../public/assets/images/img01.png'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { Button } from '@nextui-org/react'

const inter = Roboto({ subsets: ['latin'], weight: ['100', '300', '500', '900'] })

export default function Home() {
  const [loading, setloading] = useState(false)

  return (
    <>
      <header>
        <title>🏆 Rumo ao Estrelato 🏅</title>
        <link rel='SHORTCUT ICON' href='https://rumoaoestrelato.vercel.app/favicon.ico' type='image/x-icon' />
      </header>

      <div className={styles.container}>
        <div className='flex flex-col justify-center items-center w-full h-[100vh] bg-gray-800 bg-opacity-80'>
          <span className='text-4xl'>⭐⭐⭐⭐⭐</span>      
          <h1 className='text-4xl font-bold text-white'>Rumo ao Estrelato</h1>
          <Image
            src={img01}
            alt='imagem capa'
            width={250}
            height={250}
            quality={100}
            className='opacity-80 py-16'        
          />
          {!loading && (
            <Link onClick={() => setloading(true)} href={'/Instagram'} className='bg-green-700 w-[70vw] h-14 rounded-lg text-4xl text-center text-white font-bold border-x-4 border-y-2 border-white'>Carreira</Link>
          )}
          {loading && (
            <Button isLoading className='bg-green-700 w-[70vw] h-14 rounded-lg text-4xl text-center text-white font-bold border-x-4 border-y-2 border-white'>Carregando</Button>
          )}
        </div>
      </div>
    </>
  )
}
