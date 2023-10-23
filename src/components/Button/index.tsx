import Link from 'next/link';
import React from 'react'

interface ButtonProps {
  linkTo: string;
  label: string;
  state: () => void
}

export default function ButtonLink({ label, linkTo, state }: ButtonProps) {
  return (
    <>     
      <Link onClick={state} href={linkTo} className='bg-gray-500 mx-4 rounded-lg shadow-md shadow-black active:translate-y-1 active:shadow-none py-2 mb-4 text-2xl text-white text-center font-medium'>
        {label}
      </Link>
    </>
  )
}