import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaPlus, FaRegComment } from 'react-icons/fa6'
import { AiOutlineHeart } from 'react-icons/ai'
import { TbLocationShare } from 'react-icons/tb'
import { BsArrowBarRight } from 'react-icons/bs'

import { GetServerSideProps } from 'next'
import { db } from '@/services/firebaseConnection'
import { query, collection, orderBy, getDocs } from 'firebase/firestore'

interface InstagramProps {
  infoInstagram: InfoInstagram[];
  infoPerfil: InfoPerfil[];
  nPublicacoes: number;
  fotoPerfil: string;
}

export default function Instagram({ infoInstagram, infoPerfil, fotoPerfil, nPublicacoes }: InstagramProps) {
  return (
    <div className='bg-black h-[100vh] overflow-scroll'>
      <header>
        <title>⭐ Gustavo T.</title>
      </header>

      {/* == CABEÇALHO DO INSTAGRAM == == CABEÇALHO DO INSTAGRAM == == CABEÇALHO DO INSTAGRAM == == CABEÇALHO DO INSTAGRAM == */}
      <main>
        <div className='flex flex-row justify-between text-white text-xl font-semibold px-2 py-2'>
          <div className='flex flex-row items-center gap-2'>
            gustavo.player021
            <FaAngleDown />
          </div>

          <div className='flex flex-row items-center gap-2'>
            <Link href={'/Instagram/Postar'} className='border-2 border-white p-1 rounded-xl'>
              <FaPlus size={24} />
            </Link>

            <Link href={'/Dashboard'} className='text-red-500'>
              <BsArrowBarRight size={32} />
            </Link>
          </div>
        </div>

        {infoPerfil.map(item => (<>
          <div key={item.id} className='flex flex-row justify-between px-2 py-4'>
            <Image
              src={item.foto}
              alt='Imagem perfil'
              width={50}
              height={100}
              quality={100}
              className='bg-green-500 rounded-full object-cover'
            />

            <div className='flex flex-row gap-4 pr-4'>
              <div className='flex flex-col text-white items-center'>
                <span className='text-xl font-bold'>{nPublicacoes}</span>
                <span className='text-sm'>Publicações</span>
              </div>

              <div className='flex flex-col text-white items-center'>
                <span className='text-xl font-bold'>{item.seguidores}</span>
                <span className='text-sm'>Seguidores</span>
              </div>

              <div className='flex flex-col text-white items-center'>
                <span className='text-xl font-bold'>{item.seguindo}</span>
                <span className='text-sm'>Seguindo</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col text-white px-2 pb-4'>
            <span className='font-bold'>Gustavo Tavares [ {item.camisa} ]</span>
            <span className='flex flex-row gap-1'>
              Jogador profissional do 
              <Link href={`/Time/${item.idCup}`}>
                <p className='text-blue-500'>{item.instagramTime}</p>
              </Link>            
            </span>
            <span>{item.descSelecao}</span>
            <span>{item.descOpcional}</span>
          </div>
        </>))}

      </main>

      <hr className='w-[90vw] m-auto mb-2' />

      {/* == PUBLICAÇÃO == == PUBLICAÇÃO == == PUBLICAÇÃO == == PUBLICAÇÃO == == PUBLICAÇÃO == */}
      {infoInstagram.map(item => (
        <div key={item.id} className='flex flex-col items-center'>
          <div className='flex flex-row w-full px-4 py-2 gap-4'>
            <Image
              src={fotoPerfil}
              alt=''
              width={30}
              height={100}
              quality={100}
              className='bg-green-500 rounded-full object-cover'
            />

            <div className='flex flex-col text-white'>
              <span className='font-bold text-sm'>gustavo.player021</span>
              <span className='text-sm'>{item.localizacao}</span>
            </div>
          </div>
          <div>
            <Image
              src={item.imgURL}
              alt='image01'
              width={400}
              height={100}
              quality={100}
              className='pb-1'
            />
            <div className='text-white flex flex-row py-1 px-4 gap-4'>
              <AiOutlineHeart size={28} />
              <FaRegComment size={28} />
              <TbLocationShare size={28} />
            </div>
            <div className='flex flex-col text-white px-4 pb-4 text-sm'>
              <span className='mb-1'>Curtido por <strong>amandatavares._</strong> e outras {item.curtidas} pessoas</span>
              <span className='mb-1'><strong>gustavo.player021</strong> {item.descricao}</span>
              <span className='text-gray-400 mb-1'>Ver todos os 200 comentários</span>
              <span>{item.datapost}</span>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}

type InfoInstagram = {
  id: string;
  created: string;
  curtidas: string;
  datapost: string;
  descricao: string;
  imgURL: string;
  localizacao: string;
}

type InfoPerfil = {
  id: string;
  camisa: string;
  descOpcional: string;
  descSelecao: string;
  idCup: string;
  instagramTime: string;
  seguidores: string;
  seguindo: string;
  foto: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const perfilRef = query(collection(db, 'perfilInstagram'))
  const snapshotPerfil = await getDocs(perfilRef)
  const instagramRef = query(collection(db, 'instagram'), orderBy("created", 'desc'))
  const snapshotInstagram = await getDocs(instagramRef)
  let nPublicacoes = 0
  let fotoPerfil = ''

  let perfil: InfoPerfil[] = []
  snapshotPerfil.forEach(doc => {
    fotoPerfil = doc.data().foto,
    perfil.push({
      id: doc.id,
      idCup: doc.data().idCup,
      camisa: doc.data().camisa,
      descOpcional: doc.data().descOpcional,
      descSelecao: doc.data().descSelecao,
      instagramTime: doc.data().instagramTime,
      seguidores: doc.data().seguidores,
      seguindo: doc.data().seguindo,
      foto: doc.data().foto
    })
  })

  let instagram: InfoInstagram[] = []
  snapshotInstagram.forEach(doc => {
    instagram.push({
      id: doc.id,
      created: doc.data().created,
      curtidas: doc.data().curtidas,
      datapost: doc.data().datapost,
      descricao: doc.data().descricao,
      imgURL: doc.data().imgURL,
      localizacao: doc.data().localizacao
    })
  })

  nPublicacoes = instagram.length

  return {
    props: {
      infoInstagram: instagram,
      infoPerfil: perfil,
      nPublicacoes: nPublicacoes,
      fotoPerfil: fotoPerfil,
    }
  }
}
