import React from 'react'
import Image from 'next/image'
import player01 from '../../../public//assets/images/player01.png'
import headerImg from '../../../public//assets/images/home_img.png'
import Button from '@/components/Button'
import Header from '@/components/Header'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { query, collection, orderBy, getDocs } from 'firebase/firestore'

interface DashboardProps {
  imgPlayer: string;
}

export default function Dashboard({ imgPlayer }: DashboardProps) {
  return (
    <>
      <header>
        <title>Gustavo T.</title>
      </header>

      <Header imgSrc={headerImg as any} imgAlt='papel de parede' title='Gustavo T.' width={400} height={100} />

      <main className='flex flex-col w-full h-[80vh] px-8 pt-20 bg-gradient-to-t from-[#696969] to-[#111]'>
        <Image
          src={imgPlayer}
          alt='Jogador'
          quality={100}
          width={200}
          height={100}
          className='mx-auto mb-4 shadow-lg shadow-black'
        />

        <Button linkTo='/Individuais' label='🏆 Galeria de troféus' />
        <Button linkTo='/Carreira' label='⚽ Carreira' />
        <Button linkTo='/Configuracoes' label='⚙ Configurações' />
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