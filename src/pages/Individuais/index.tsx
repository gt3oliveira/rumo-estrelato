import { GetServerSideProps } from 'next'
import Header from '@/components/Header'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { FaAngleRight, FaArrowLeft } from 'react-icons/fa6'

import capaTheBest from '../../../public/assets/images/the-best.png'
import worldPlayer from '../../../public/assets/imgTrofeusIndividuais/world-player.png'
import europaPlayer from '../../../public/assets/imgTrofeusIndividuais/europa-player.png'
import sulamericanoPlayer from '../../../public/assets/imgTrofeusIndividuais/sulamericano-player.png'

import { db } from '@/services/firebaseConnection'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

type SulamericanoBest = {
  id: string;
  nameTime: string;
  escudoTime: string;
  camisaTime: string;
  anoTitulo: string;
}

type WorldBest = {
  id: string;
  nameTime: string;
  escudoTime: string;
  camisaTime: string;
  anoTitulo: string;
}

type EuropaBest = {
  id: string;
  nameTime: string;
  escudoTime: string;
  camisaTime: string;
  anoTitulo: string;
}

interface IndividuaisProps {
  sulamericanoBest: SulamericanoBest[];
  worldBest: WorldBest[];
  europaBest: EuropaBest[];
}

export default function Individuais({ worldBest, europaBest, sulamericanoBest }: IndividuaisProps) {
  const defaultTitle = "border-b-1 border-white";

  let ok1 = true; let ok2 = true; let ok3 = true;
  if (worldBest.length === 0) ok1 = false;
  if (europaBest.length === 0) ok2 = false;
  if (sulamericanoBest.length === 0) ok3 = false;

  const noContent = (
    <div className='flex justify-center pb-4'>
      <span className='text-white text-2xl text-center'>Gustavo T. não possui este título.</span>
    </div>
  )

  const bestWorld = worldBest.map(item => (
    <>      
      <div key={item.id} className='flex flex-row py-4 justify-around overflow-hidden'>
        <div className='flex justify-center w-[50vw]'>
          <Image
            src={worldPlayer}
            alt='Melhor do Mundo'
            quality={100}
            width={100}
            className='object-cover'
          />
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
          </div>
        </div>
      </div>
      <hr />
    </>
  ))

  const bestEuropa = europaBest.map(item => (
    <>      
      <div key={item.id} className='flex flex-row py-4 justify-around overflow-hidden'>
        <div className='flex justify-center w-[50vw]'>
          <Image
            src={europaPlayer}
            alt='Melhor da Europa'
            quality={100}
            width={100}
            className='object-cover'
          />
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
          </div>
        </div>
      </div>
      <hr />
    </>
  ))

  const bestSulamericano = sulamericanoBest.map(item => (
    <>      
      <div key={item.id} className='flex flex-row py-4 justify-around overflow-hidden'>
        <div className='flex justify-center w-[50vw]'>
          <Image
            src={sulamericanoPlayer}
            alt='Melhor da Europa'
            quality={100}
            width={100}
            className='object-cover'
          />
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
          </div>
        </div>
      </div>
      <hr />
    </>
  ))

  return (
    <>
      <header>
        <title>🏅 Títulos Individuais</title>
      </header>

      <Header imgSrc={capaTheBest as any} imgAlt='Capa The Best' title='Títulos Individuais' width={400} height={100} />
      <Link href={'/Dashboard'} className='absolute top-3 left-3 text-white'>
        <FaArrowLeft size={28} />
      </Link>

      <Link href={'/Trofeus'} className='absolute top-[175px] right-12 text-white'>
        <FaAngleRight size={28} />
      </Link>

      <div className='h-[15vh] bg-[#040108]' />

      <main className='flex flex-col overflow-scroll pt-4 w-full h-[65vh] bg-gradient-to-t from-[#0D0733] to-[#040108]'>
        <Accordion>
          {/* == MELHOR DO MUNDO == == MELHOR DO MUNDO == == MELHOR DO MUNDO == == MELHOR DO MUNDO == */}
          <AccordionItem className={defaultTitle} key="1" aria-label="Accordion 1"
            title={<p className='text-white text-2xl'>🏅 Melhor do mundo</p>}
          >
            <div className='flex flex-col'>
              {ok1 === true ? (bestWorld) : (noContent)}
            </div>
          </AccordionItem>

          {/* == MELHOR DA EUROPA == == MELHOR DA EUROPA == == MELHOR DA EUROPA == == MELHOR DA EUROPA == */}
          <AccordionItem className={defaultTitle} key="2" aria-label="Accordion 2"
            title={<p className='text-white text-2xl'>🥇 Melhor da Europa</p>}
          >
            <div className='flex flex-col'>
              {ok2 === true ? (bestEuropa) : (noContent)}
            </div>
          </AccordionItem>

          {/* == MELHOR SULAMERICANO == == MELHOR SULAMERICANO == == MELHOR SULAMERICANO == == MELHOR SULAMERICANO == */}
          <AccordionItem key="3" aria-label="Accordion 3"
            title={<p className='text-2xl text-white'>🥇 Melhor Sulamericano</p>}
          >
            <div className='flex flex-col mb-4'>
              {ok3 === true ? (bestSulamericano) : (noContent)}
            </div>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  )
}

type TitulosIndividuaisProps = {
  id: string;
  nameTime: string;
  escudoTime: string;
  camisaTime: string;
  anoTitulo: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const titulosRef = query(collection(db, 'titulosIndividuais'), orderBy("anoTitulo", 'asc'))
  const snapshotTitulos = await getDocs(titulosRef)

  let sulamericanoBest: TitulosIndividuaisProps[] = []
  let worldBest: TitulosIndividuaisProps[] = []
  let europaBest: TitulosIndividuaisProps[] = []

  snapshotTitulos.forEach(doc => {
    if (doc.data().idTrofeuIndividual === 'v1R5NxmgIZYHAKRDcpj5') {
      sulamericanoBest.push({
        id: doc.id,
        escudoTime: doc.data().escudoTime,
        nameTime: doc.data().nameTime,
        camisaTime: doc.data().camisaTime,
        anoTitulo: doc.data().anoTitulo
      })
    } else
      if (doc.data().idTrofeuIndividual === 'YPoM6WOkLUHDIJCM2Q8U') {
        worldBest.push({
          id: doc.id,
          escudoTime: doc.data().escudoTime,
          nameTime: doc.data().nameTime,
          camisaTime: doc.data().camisaTime,
          anoTitulo: doc.data().anoTitulo
        })
      } else
        if (doc.data().idTrofeuIndividual === 'uDc1JJJUKodmSja9ReVk') {
          europaBest.push({
            id: doc.id,
            escudoTime: doc.data().escudoTime,
            nameTime: doc.data().nameTime,
            camisaTime: doc.data().camisaTime,
            anoTitulo: doc.data().anoTitulo
          })
        }
  })

  return {
    props: {
      sulamericanoBest: sulamericanoBest,
      worldBest: worldBest,
      europaBest: europaBest,
    }
  }
}
