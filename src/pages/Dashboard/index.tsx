import React from 'react'
import Image from 'next/image'
import player01 from '../../../public//assets/images/player01.png'
import headerImg from '../../../public//assets/images/home_img.png'
import Button from '@/components/Button'
import Header from '@/components/Header'

export default function Dashboard() {

  return (
    <>
      <header>
        <title>Gustavo T.</title>
      </header>

      <Header imgSrc={headerImg as any} imgAlt='papel de parede' title='Gustavo T.' width={400} height={100} />

      <main className='flex flex-col w-full h-[80vh] px-8 pt-20 bg-gradient-to-t from-[#696969] to-[#111]'>
        <Image
          src={player01}
          alt='Jogador'
          quality={100}
          width={200}
          className='mx-auto mb-4 shadow-lg shadow-black'
        />

        <Button linkTo='/Individuais' label='🏆 Galeria de troféus' />
        <Button linkTo='/Carreira' label='⚽ Carreira' />
        <Button linkTo='/Configuracoes' label='⚙ Configurações' />                
      </main>
    </>
  )
}
