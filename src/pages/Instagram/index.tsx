import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaPlus, FaRegComment } from 'react-icons/fa6'
import { AiOutlineHeart } from 'react-icons/ai'
import { TbLocationShare } from 'react-icons/tb'
import { BsArrowBarRight } from 'react-icons/bs'

import playerPhoto from '../../../public/assets/images/player01.png'
import photo01 from '../../../public/assets/imgInsta/PES2017.20231012_001007.png'
import photo02 from '../../../public/assets/imgInsta/PES2017.exe_DX9_20231012_001010.png'
import photo03 from '../../../public/assets/imgInsta/PES2017.exe_DX9_20231012_002919.png'
import photo04 from '../../../public/assets/imgInsta/PES2017.exe_DX9_20231012_015228.png'
import photo05 from '../../../public/assets/imgInsta/PES2017.exe_DX9_20231012_025048.bmp'
import photo06 from '../../../public/assets/imgInsta/brasil.png'


export default function Instagram() {
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
            <Link href={'#'} className='border-2 border-white p-1 rounded-xl'>
              <FaPlus size={24} />
            </Link>

            <Link href={'/Dashboard'} className='text-red-500'>
              <BsArrowBarRight size={32} />
            </Link>
          </div>
        </div>

        <div className='flex flex-row justify-between px-2 py-4'>
          <Image
            src={playerPhoto}
            alt=''
            width={50}
            quality={100}
            className='bg-green-500 rounded-full'
          />

          <div className='flex flex-row gap-4 pr-4'>
            <div className='flex flex-col text-white items-center'>
              <span className='text-xl font-bold'>150</span>
              <span className='text-sm'>Publicações</span>
            </div>

            <div className='flex flex-col text-white items-center'>
              <span className='text-xl font-bold'>1.648.569</span>
              <span className='text-sm'>Seguidores</span>
            </div>

            <div className='flex flex-col text-white items-center'>
              <span className='text-xl font-bold'>560</span>
              <span className='text-sm'>Seguindo</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col text-white px-2 pb-4'>
          <span className='font-bold'>Gustavo Tavares [ 20 ]</span>
          <span className='flex flex-row gap-1'>Jogador profissional do <p className='text-blue-500'>@CosenzaCalcio</p></span>
          <span>🟢🟡 Seleção Brasileira [ 11 ]</span>
          <span></span>
        </div>
      </main>

      <hr className='w-[90vw] m-auto mb-2' />

      {/* == PUBLICAÇÃO == == PUBLICAÇÃO == == PUBLICAÇÃO == == PUBLICAÇÃO == == PUBLICAÇÃO == */}
      <div className='flex flex-col items-center'>
        <div className='flex flex-row w-full px-4 py-2 items-center gap-4'>
          <Image
            src={playerPhoto}
            alt=''
            width={30}
            quality={100}
            className='bg-green-500 rounded-full'
          />

          <div className='flex flex-col text-white'>
            <span className='font-bold text-sm'>gustavo.player021</span>
            <span className='text-sm'>San Siro, Milão</span>
          </div>
        </div>
        <div>
          <Image
            src={photo05}
            alt='image01'
            width={400}
            quality={100}
            className='pb-1'
          />
          <div className='text-white flex flex-row py-1 px-4 gap-4'>
            <AiOutlineHeart size={28} />
            <FaRegComment size={28} />
            <TbLocationShare size={28} />
          </div>
          <div className='flex flex-col text-white px-4 pb-4 text-sm'>
            <span className='mb-1'>Curtido por <strong>amandatavares._</strong> e outras 5.517.437 pessoas</span>
            <span className='mb-1'><strong>gustavo.player021</strong> Preparado para a partida. 20 e faixa de capitão ( C ) !! 🙌🏻🙏🏻</span>
            <span className='text-gray-400 mb-1'>Ver todos os 200 comentários</span>
            <span>12 de outubro de 2023</span>
          </div>
        </div>
      </div>

    </div>
  )
}
