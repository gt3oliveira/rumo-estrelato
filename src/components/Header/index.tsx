import React from 'react'
import Image from 'next/image';

interface HeaderProps{
  imgSrc: string;
  imgAlt: string;
  title: string;
  width: number;
  height: number;
}

export default function Header({imgSrc, imgAlt, title, width, height}: HeaderProps) {
  return (
    <div className='bg-black flex justify-center'>
      <div className={`flex justify-center z-0 items-center w-full h-[20vh] bg-white opacity-60 overflow-hidden`}>
        <Image
          src={imgSrc}
          alt={imgAlt}
          quality={100}
          width={width}
          height={height} 
          className='object-cover'         
        />
      </div>
      <div className='bg-gray-500 w-[80vw] absolute z-20 top-32 flex rounded-lg justify-center gap-2 items-center border-2 border-white'>
        <label className='text-4xl text-white text-center font-bold p-4'>{title}</label>
      </div>
    </div>
  )
}
