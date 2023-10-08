import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import capa from '../../../public/assets/images/capa-carreira.png'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { query, collection, orderBy, getDocs } from 'firebase/firestore'

interface CarreiraProps {
  infoCups: InfoCups[]
}

export default function Carreira({ infoCups }: CarreiraProps) {
  return (
    <>
      <header>
        <title>Minha Carreira</title>
      </header>

      <Header imgSrc={capa as any} imgAlt='Carreira' title='Carreira' width={360} height={100} />
      <Link href={'/Dashboard'} className='absolute top-3 left-3'>
        <FaArrowLeft class='text-white' size={28} />
      </Link>

      <div className='h-[10vh] bg-gradient-to-t from-[#111] to-[#000]' />

      <main className='flex flex-col w-full pt-4 px-4 overflow-scroll h-[70vh] bg-gradient-to-t from-[#696969] to-[#111]'>
        <div className=' flex flex-wrap justify-around'>
          {infoCups.map(item => (
            <Link href={`Time/${item.id}`} key={item.id} className='p-4 mb-4 active:scale-95 bg-gradient-to-tl from-[#393939] to-[#b3b3b3] border-2 border-[#A3519D] w-fit rounded-full'>
              <Image
                src={item.imgLogo}
                alt={item.name}
                width={100}
                height={100}
                quality={100}
                className='object-cover'
              />
            </Link>          
          ))}
        </div>
      </main>

    </>
  )
}

type InfoCups = {
  id: string;
  name: string;
  imgLogo: string;
}

type IdCups = {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const campeonatosRef = query(collection(db, 'campeonatos'), orderBy("name", 'asc'))
  const snapshotCampeonatos = await getDocs(campeonatosRef)
  const timesRef = query(collection(db, 'times'), orderBy('idCup', 'asc'))
  const snapshotTimes = await getDocs(timesRef)

  let igual = ''

  let idCupTimesAll: IdCups[] = []
  snapshotTimes.forEach(item => {
    if(item.data().idCup !== igual){
      igual = item.data().idCup
      idCupTimesAll.push({
        id: item.data().idCup
      })
    }
  })

  let campeonatos: InfoCups[] = []
  snapshotCampeonatos.forEach(doc => {
    if(doc.data().imgLogo !== ''){
      idCupTimesAll.map(item => {
        if(doc.id === item.id){
          campeonatos.push({
            id: doc.id,
            name: doc.data().name,
            imgLogo: doc.data().imgLogo
          })
        }
      })
    }
  })

  return {
    props: {
      infoCups: campeonatos,
    }
  }
}
