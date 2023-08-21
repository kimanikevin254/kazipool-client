import { BiDislike } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import Link from 'next/link'

export default function JobCard({ job }){
    return (
        <Link href={`find-work/jobs/${job._id}`} className='flex flex-col space-y-3 px-2 py-4'>
            <div className='flex items-center justify-between'>
                {/* title */}
                <p className='font-semibold'>{job.title}</p>

                {/* actions */}
                <div className='flex gap-3'>
                    <button className='p-1 rounded-full border border-gray-200'>
                        <BiDislike className='h-6 w-6' />
                    </button>

                    <button className='p-1 rounded-full border border-gray-200'>
                        <AiOutlineHeart className='h-6 w-6' />
                    </button>
                </div>
            </div>

            <p><span className='text-xs text-gray-600 font-semibold'>Fixed-price</span> - <span className='text-xs text-gray-500 font-medium'>Posted on {new Date(job.createdAt).toLocaleString()}</span></p>

            <div className='flex items-center justify-between'>
                <div className='flex flex-col w-2/3'>
                    <p className='font-semibold text-sm'>{job.compensation}</p>
                    <p className='text-xs text-gray-500'>Budget</p>
                </div>

                <div className='flex flex-col w-2/3'>
                    <p className='font-semibold text-sm'>{job.skill_level.charAt(0).toUpperCase() + job.skill_level.slice(1)}</p>
                    <p className='text-xs text-gray-500'>Experience Level</p>
                </div>
            </div>

            <p className='text-sm'>{job.description.length > 40 ? `${job.description.slice(0,40)}..` : job.description}</p>
        </Link>
    )
}