'use client'

import carousel1 from '@/assets/carousel1.jpg'
import carousel2 from '@/assets/carousel2.jpg'
import Image from 'next/image'
import { useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(carousel1)

  const updateCarouselImage = () => {
    if (currentImage === carousel1) {
      setCurrentImage(carousel2)
    } else {
      setCurrentImage(carousel1)
    }
  }
  
  return (
    <div className='relative'>
      <Image
        src={currentImage}
        alt='Carousel image'
      />

      <div className='absolute top-0 w-full h-full'>
        <div className='w-full h-full bg-black bg-opacity-40 text-white flex items-center p-8 justify-between'>
          {
            currentImage === carousel1 ?

            <div className='w-3/5'>
                <h2 className='text-5xl font-bold'>Find The Perfect Job That You Desire</h2>
                <p className='mt-3 text-lg font-semibold'>Uncover your ideal job match amidst a range of openings, and pave the way for a rewarding and prosperous future.</p>
            </div> :

            <div className='w-3/5 backdrop-filter backdrop-blur-sm bg-clip-padding'>
                <h2 className='text-5xl font-bold'>Connecting Employers with Leading Talent</h2>
                <p className='mt-3 text-lg font-semibold'>We Bring Employers and Market-Leading Talent Together, Unleashing Synergy that Ignites Success and Fuels Unprecedented Growth.</p>
            </div>
          }

          <div className='flex flex-col space-y-2'>
            <button onClick={() => updateCarouselImage()} className='border p-2'><IoChevronForward className='h-12 w-12' /></button>
            <button onClick={() => updateCarouselImage()} className='border p-2'><IoChevronBack className='h-12 w-12' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
