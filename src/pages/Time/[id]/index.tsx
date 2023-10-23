import Header from '@/components/Header'
import { db } from '@/services/firebaseConnection'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { query, collection, orderBy, getDocs, where } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaAngleLeft, FaArrowLeft } from 'react-icons/fa6'

interface TimesProps {
  infoTime: InfoTime[];
  infoCup: InfoCups[];
  imgPlayer: string;
}

export default function Times({ infoCup, infoTime, imgPlayer }: TimesProps) {
  const [infoTitulos, setInfoTitulos] = useState<InfoTitulos[]>([])

  async function buscarTitulos(idTime: string) {
    const titulosRef = query(collection(db, 'titulos'), orderBy('anoTitulo', 'desc'), where('idTime', '==', idTime))
    const snapshotTitulos = await getDocs(titulosRef)

    let titulos: InfoTitulos[] = []
    snapshotTitulos.forEach(doc => {
      titulos.push({
        id: doc.id,
        anoTitulo: doc.data().anoTitulo,
        artilheiro: doc.data().artilheiro,
        assistencia: doc.data().assistencia,
        camisaTime: doc.data().camisaTime,
        escudoTime: doc.data().escudoTime,
        idTime: doc.data().idTime,
        imgTrofeu: doc.data().imgTrofeu,
        nameTime: doc.data().nameTime,
        nameTrofeu: doc.data().nameTrofeu
      })
    })

    setInfoTitulos(titulos)
  }

  const content = infoTitulos.map(item => (
    <div className='flex flex-col bg-[#00000053] z-10 rounded-2xl mb-4 py-2'>      
      <div key={item.id} className='flex flex-row justify-around w-full'>
        <div className='flex flex-col justify-center items-center'>
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
        <div className='flex flex-col overflow-hidden relative'>         
          <div className='flex flex-col items-center z-10'>
            <span className='text-2xl text-white'>Ano do título</span>
            <span className='text-xl text-white mb-2'>{item.anoTitulo}</span>
            <span className='text-white text-5xl font-bold'>{item.camisaTime}</span>
            <span className='text-white'>Gustavo T.</span>
            <span className='text-lg'>{item.artilheiro} {item.assistencia}</span>
          </div>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <header>
        {infoCup.map(item => (
          <title>{item.name}</title>
        ))}
      </header>

      {infoCup.map(item => (
        <Header imgAlt={item.name} imgSrc={item.imgLogo} title={item.name} width={150} height={150} />
      ))}
      <Link href={'/Dashboard'} className='absolute top-3 left-3'>
        <FaArrowLeft class='text-white' size={28} />
      </Link>

      <Link href={'/Carreira'} className='absolute z-20 top-[155px] left-10'>
        <FaAngleLeft class='text-white' size={28} />
      </Link>

      <div className='h-[10vh] bg-gradient-to-t from-[#111] to-[#080808]' />

      <main className='flex flex-col w-full pt-4 px-2 overflow-scroll h-[70vh] bg-gradient-to-t from-[#696969] to-[#111]'>
        <Image
          src={imgPlayer}
          alt='Jogador'
          width={250}
          height={100}
          quality={100}
          className='absolute bottom-0 right-0 opacity-60'
        />        
        {infoTime.map(item => (
          <Accordion className='z-10'>
            <AccordionItem key="1" aria-label="Accordion 1" onClick={() => buscarTitulos(item.id)}
              title={
                <p className='text-white text-2xl items-center flex flex-row gap-2'>
                  <Image
                    src={item.escudo}
                    alt={item.name}
                    width={30}
                    height={100}
                    quality={100}
                  />
                  {item.name}
                </p>
              }
            >
              <div className='flex flex-col'>
                {content}
              </div>
            </AccordionItem>
          </Accordion>
        ))}
      </main>

    </>
  )
}

type InfoTime = {
  id: string;
  name: string;
  idCup: string;
  escudo: string;
  camisa: string;
}

type InfoCups = {
  id: string;
  name: string;
  logo: string;
  imgLogo: string;
}

type InfoTitulos = {
  id: string;
  anoTitulo: string;
  artilheiro: string;
  assistencia: string;
  camisaTime: string;
  escudoTime: string;
  idTime: string;
  imgTrofeu: string;
  nameTime: string;
  nameTrofeu: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as any

  const playerRef = query(collection(db, 'playerTime'))
  const snapshotPlayer = await getDocs(playerRef)

  let image = ''
  snapshotPlayer.forEach(item => {
    if (item.data().idCup === id) {
      image = item.data().imgPlayer
    }
  })

  const campeonatosRef = query(collection(db, 'campeonatos'), orderBy("name", 'asc'))
  const snapshotCampeonatos = await getDocs(campeonatosRef)

  const timesRef = query(collection(db, 'times'))
  const snapshotTimes = await getDocs(timesRef)

  let campeonatos: InfoCups[] = []
  snapshotCampeonatos.forEach(cup => {
    if (cup.id === id) {
      campeonatos.push({
        id: cup.id,
        name: cup.data().name,
        logo: cup.data().logo,
        imgLogo: cup.data().imgLogo
      })
    }
  })

  let times: InfoTime[] = []
  snapshotTimes.forEach(time => {
    if (time.data().idCup === id) {
      times.push({
        id: time.id,
        name: time.data().name,
        escudo: time.data().escudo,
        camisa: time.data().camisa,
        idCup: time.data().idCup
      })
    }
  })

  return {
    props: {
      infoCup: campeonatos,
      infoTime: times,
      imgPlayer: image,
    }
  }
}
