import Header from '@/components/Header'
import React from 'react'
import capa from '../../../public/assets/images/bg-oficial.png'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection';
import { query, collection, orderBy, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import logo from '../../../public/assets/images/mizuno-logo.png'
import { Button } from '@nextui-org/react';

interface PatrocinadorProps {
  imgPlayer: string;
}

export default function Patrocinador({ imgPlayer }: PatrocinadorProps) {
  const divImgPlayer = (
    <div className='absolute z-10 top-2 right-14'>
      <Image 
        src={imgPlayer}
        alt='Player'
        width={100}
        height={100}
        quality={100}
      />
    </div>
  )

  return (
    <>
      <Header width={400} height={100} imgAlt='Capa Patrocinio' title='Patrocinador' imgSrc={capa as any} />      
      {divImgPlayer}

      <Link href={'/Dashboard'} className='absolute top-3 left-3 text-white'>
        <FaArrowLeft size={28} />
      </Link>
      
      <main className='flex flex-col w-full h-[80vh] px-8 pt-24 pb-4 overflow-scroll bg-gradient-to-t from-[#696969] to-[#111]'>
        <Image
          src={logo}
          alt='mizuno' 
          width={100}
          height={100}
          quality={100}
          className='mx-auto rounded-xl'          
        />
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
