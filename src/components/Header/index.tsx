import React from 'react'
import Image from 'next/image';

interface HeaderProps{
  imgSrc: string;
  imgAlt: string;
  title: string;
}

export default function Header({imgSrc, imgAlt, title}: HeaderProps) {
  return (
    <div className='bg-black flex justify-center'>
      <div className={`flex items-center w-full h-[20vh] border-b-1 border-gray-400 opacity-60 overflow-hidden`}>
        <Image
          src={imgSrc}
          alt={imgAlt}
          quality={100}
          width={400}
          height={100}          
        />
      </div>
      <div className='bg-gray-500 w-[80vw] absolute top-32 flex rounded-lg justify-center gap-2 items-center border-2 border-white'>
        <label className='text-4xl text-white text-center font-bold p-4'>{title}</label>
      </div>
    </div>
  )
}
