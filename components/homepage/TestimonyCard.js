import { BiSolidQuoteLeft } from 'react-icons/bi'
import { FaUserTie } from 'react-icons/fa'

export default function TestimonyCard({ testimony: { name, text }}){
    return (
        <div className='w-1/3 bg-green-200 mt-6 rounded p-4 space-y-3'>
            <BiSolidQuoteLeft className='h-8 w-8 text-green-600' />

            <p className='text-sm'>{text}</p>

            <div className='flex gap-4 items-center'>
                <FaUserTie className='h-7 w-7' />
                <p className='font-bold'>{name}</p>
            </div>
        </div>
    )
}