import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

export default function EmployerJobCard({ job }){
    return (
        <div className='flex flex-col space-y-3 px-2 py-4 z-10'>
            <div className='flex items-center justify-between'>
                {/* title */}
                <Link href={`/my-jobs/employer/${job._id}`} className='font-semibold underline'>{job.title}</Link>

                {/* actions */}
                
                <div className='flex gap-3'>
                    <Link href={`/my-jobs/employer/proposals/job/${job._id}`} className="border border-green-600 px-4 py-2 rounded w-fit"><span>Proposals: </span><span>{job.proposals.length}</span></Link>

                    <Link href={`/my-jobs/employer/edit/${job._id}`} className='px-4 py-2 rounded bg-blue-600 flex items-center gap-2 text-white z-20'>
                        <FaRegEdit className='h-5 w-5' />
                        <span>Edit</span>
                    </Link>

                    <button className='px-4 py-2 rounded bg-red-600 flex items-center gap-2 text-white z-20'>
                        <BsFillTrashFill className='h-5 w-5' />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <p><span className='text-xs text-gray-600 font-semibold'>Fixed-price</span> - <span className='text-xs text-gray-500 font-medium'>Posted on {new Date(job.createdAt).toLocaleString()}</span></p>

            <div className='flex items-center justify-between'>
                <div className='flex flex-col w-2/3'>
                    <p className='font-semibold text-sm'>$ {job.compensation}</p>
                    <p className='text-xs text-gray-500'>Budget</p>
                </div>

                <div className='flex flex-col w-2/3'>
                    <p className='font-semibold text-sm'>{job.skill_level.charAt(0).toUpperCase() + job.skill_level.slice(1)}</p>
                    <p className='text-xs text-gray-500'>Experience Level</p>
                </div>
            </div>

            <p className='text-sm'>{job.description.length > 40 ? `${job.description.slice(0,40)}..` : job.description}</p>
        </div>
    )
}