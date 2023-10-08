import Header from '@/components/Header'
import React from 'react'
import capa from '../../../public/assets/images/capa-galeria-de-trofeus.png'
import Link from 'next/link'
import { FaArrowLeft, FaAngleLeft } from 'react-icons/fa6'

import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/services/firebaseConnection'

interface MeusTrofeusProps {
  infoTitulos: InfoTitulos[]
}

export default function MeusTrofeus({ infoTitulos }: MeusTrofeusProps) {
  let ok = true
  if (infoTitulos.length === 0) ok = false;

  const noContent = (
    <div className='flex justify-center'>
      <span className='text-white text-2xl text-center'>Gustavo T. não possui títulos.</span>
    </div>
  )

  const content = infoTitulos.map(item => (
    <>
      <div key={item.id} className='flex flex-row w-full pb-2'>
        <div className='flex flex-col justify-center items-center w-[50vw]'>
          <Image
            src={item.imgTrofeu}
            alt={item.nameTrofeu}
            quality={100}
            width={100}
            height={100}
            className='object-cover'
          />
          <span className='pt-2 text-center text-white text-sm'>{item.nameTrofeu}</span>
        </div>
        <div className='flex flex-col overflow-hidden relative w-[50vw]'>
          <Image
            src={item.escudoTime}
            alt={item.nameTime}
            width={130}
            height={130}
            quality={100}
            className='absolute z-0 left-20 ml-2 opacity-40'
          />
          <div className='flex flex-col items-center z-10'>
            <span className='text-2xl text-white'>{item.nameTime}</span>
            <span className='text-xl text-white mb-2'>{item.anoTitulo}</span>
            <span className='text-white text-5xl font-bold'>{item.camisaTime}</span>
            <span className='text-white'>Gustavo T.</span>
            <span>{item.artilheiro} {item.assitencia}</span>
          </div>
        </div>
      </div>

      <hr className='w-[60vw] m-auto' />
    </>
  ))

  return (
    <>
      <Header title='Meus trofeus' imgSrc={capa as any} imgAlt='Galeria de Trofeus' />
      <Link href={'/Dashboard'} className='absolute top-3 left-3'>
        <FaArrowLeft class='text-white' size={28} />
      </Link>

      <Link href={'/Individuais'} className='absolute top-[155px] left-10'>
        <FaAngleLeft class='text-white' size={28} />
      </Link>

      <div className='h-[10vh] bg-gradient-to-t from-[#111] to-[#000]' />

      <main className='flex flex-col w-full pt-4 px-2 overflow-scroll h-[70vh] bg-gradient-to-t from-[#696969] to-[#111]'>
        <div className='flex flex-col bg-[#00000053] rounded-2xl mb-4 py-4'>
          {ok === true ? (content) : (noContent)}
        </div>
      </main>
    </>
  )
}

type InfoTitulos = {
  id: string;
  idTime: string;
  imgTrofeu: string;
  nameTrofeu: string;
  nameTime: string;
  escudoTime: string;
  camisaTime: string;
  anoTitulo: string;
  artilheiro: string;
  assitencia: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const titulosRef = query(collection(db, 'titulos'), orderBy("anoTitulo", 'desc'))
  const snapshotTitulos = await getDocs(titulosRef)

  let titulos: InfoTitulos[] = []
  snapshotTitulos.forEach(doc => {
    titulos.push({
      id: doc.id,
      idTime: doc.data().idTime,
      nameTime: doc.data().nameTime,
      escudoTime: doc.data().escudoTime,
      camisaTime: doc.data().camisaTime,
      nameTrofeu: doc.data().nameTrofeu,
      imgTrofeu: doc.data().imgTrofeu,
      anoTitulo: doc.data().anoTitulo,
      artilheiro: doc.data().artilheiro,
      assitencia: doc.data().assitencia
    })
  })

  return {
    props: {
      infoTitulos: titulos,
    }
  }
}
