import Link from 'next/link'
import { MdNavigateNext, MdLocationOn } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'

export default function Footer(){
    return (
        <div className="bg-gray-700 p-8">
            <div className='flex justify-around'>
                <div>
                    <h2 className='font-bold text-xl text-white'>Company</h2>
                    <div>
                        <div className='mt-4 flex flex-col space-y-2'>
                            <Link href={'#'} className='flex items-center text-gray-300 font-bold'>
                                <MdNavigateNext />
                                <p>Home</p>
                            </Link>
                            <Link href={'#'} className='flex items-center text-gray-300 font-bold'>
                                <MdNavigateNext />
                                <p>About</p>
                            </Link>
                            <Link href={'#'} className='flex items-center text-gray-300 font-bold'>
                                <MdNavigateNext />
                                <p>Contact</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='font-bold text-xl text-white'>Contact</h2>
                    <div>
                        <div className='mt-4 flex flex-col space-y-2'>
                            <div className='flex items-center text-gray-300 font-bold gap-2'>
                                <IoLocationSharp className='h-4 w-4' />
                                <p>Nairobi, Kenya</p>
                            </div>
                            <div className='flex items-center text-gray-300 font-bold gap-2'>
                                <BsTelephoneFill className='h-4 w-4' />
                                <p>+254 758 202 697</p>
                            </div>
                            <div className='flex items-center text-gray-300 font-bold gap-2'>
                                <IoMdMail className='h-4 w-4' />
                                <p>kimanikevin254@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}