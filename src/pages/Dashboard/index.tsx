import React, { useState } from 'react'
import Image from 'next/image'
import headerImg from '../../../public//assets/images/home_img.png'
import ButtonLink from '@/components/Button'
import Header from '@/components/Header'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { query, collection, orderBy, getDocs } from 'firebase/firestore'
import { FaInstagram } from 'react-icons/fa6'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

interface DashboardProps {
  imgPlayer: string;
}

export default function Dashboard({ imgPlayer }: DashboardProps) {
  const [loading, setLoading] = useState(false)  

  return (
    <>
      <header>
        <title>Dashboard</title>
      </header>

      <Header imgSrc={headerImg as any} imgAlt='papel de parede' title='Gustavo T.' width={400} height={100} />

      <main className='flex flex-col w-full h-[80vh] px-8 pt-20 pb-4 overflow-scroll bg-gradient-to-t from-[#696969] to-[#111]'>
        <Image
          src={imgPlayer}
          alt='Jogador'
          quality={100}
          width={200}
          height={100}
          className='mx-auto mb-4 shadow-lg shadow-black'
        />

        <ButtonLink linkTo='/Individuais' label='🏆 Galeria de troféus' />
        <ButtonLink linkTo='/Carreira' label='⚽ Carreira' />
        <ButtonLink linkTo='/Configuracoes' label='⚙ Configurações' />        
        <Link href={'/Instagram'} className='flex flex-row items-center justify-center gap-2 bg-gray-500 mx-4 rounded-lg shadow-md shadow-black active:translate-y-1 active:shadow-none py-2 mb-4 text-2xl text-white text-center font-medium'>
          <FaInstagram size={28} />
          <span>Instagram</span>
        </Link>
      </main>
    </>
  )
}

type CapaProps = {
  created: string;
  imgPlayer: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const capaRef = query(collection(db, 'playerCapa'), orderBy("created", 'asc'))
  const snapshotCapa = await getDocs(capaRef)

  let maior = ''; let image = ''
  let capa: CapaProps[] = []
  snapshotCapa.forEach(doc => {
    capa.push({
      created: doc.data().created,
      imgPlayer: doc.data().imgPlayer
    })
  })

  capa.forEach(item => {
    if (item.created > maior)
      image = item.imgPlayer
  })

  return {
    props: {
      imgPlayer: image,
    }
  }
}