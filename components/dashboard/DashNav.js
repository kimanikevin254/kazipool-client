'use client'

import { IoMenuSharp } from 'react-icons/io5'
import { BsSearch } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import Link from 'next/link'
import { useLogoutMutation } from '@/redux/slice/user/usersApiSlice'
import { useDispatch } from 'react-redux'
import { clearCredentials } from '@/redux/slice/user/authSlice'
import { usePathname } from 'next/navigation'
import { AiFillCaretDown } from 'react-icons/ai'
import { useState } from 'react'

export default function DashNav(){
    const pathName = usePathname()
    const dispatch = useDispatch()

    const [logout, { isLoading}] = useLogoutMutation()

    const signout = async() => {
        try {
            await logout().unwrap()
            dispatch(clearCredentials())
        } catch (err) {
            console.log(err)
        }
    }

    // manage dropdown 
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className='flex items-center justify-between'>
            <button className='cursor-pointer md:hidden'>
                <IoMenuSharp className='w-8 h-8' />
            </button>

            <div className='flex items-center space-x-8'>
                <h1 className="text-center font-bold text-xl text-green-600">KaziPool</h1>

                {/* hidden in small screens */}
                <div className='sm:hidden md:flex md:items-center md:space-x-4'>
                    <button>
                        <Link href={'/find-work'} className={pathName.includes('find-work') ? 'text-green-600' : ''}>Find Work</Link>
                    </button>
                    <div onMouseEnter={() => setShowMenu(!showMenu)} onMouseLeave={() => setShowMenu(false)} className='relative'>
                        <button className='flex items-center gap-1'>
                            <span>My Jobs</span>
                            <AiFillCaretDown />
                        </button>
                        <div className={showMenu ? 'absolute flex flex-col justify-start z-10 bg-white shadow-xl rounded py-2' : 'hidden'}>
                            <button className='px-6 py-2 block text-left hover:bg-green-600 hover:text-white'>Freelancer</button>
                            <Link href={'/my-jobs/employer'} className='px-6 py-2 block text-left hover:bg-green-600 hover:text-white'>Employer</Link>
                        </div>
                    </div>
                    <button>
                        <Link href={'#'}>Reports</Link>
                    </button>
                    <button>
                        <Link href={'#'}>Messages</Link>
                    </button>
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <button className='cursor-pointer md:hidden'>
                    <BsSearch className='w-6 h-6' />
                </button>

                {/* hidden in small screens */}
                <div className='sm:hidden md:flex md:items-center md:space-x-4'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input className="appearance-none block w-full border border-gray-200 rounded-full py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Search" />
                        </form>

                        <button onClick={() => signout()} className='border rounded-full border-gray-200 p-2'>
                            <BiUser className='w-8 h-8' />
                        </button>
                </div>
            </div>
        </div>
    )
}