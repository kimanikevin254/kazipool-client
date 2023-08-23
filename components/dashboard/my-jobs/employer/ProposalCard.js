import Link from "next/link";
import { AiOutlineStop } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function ProposalCard({ proposal }){
    return (
        <div className='flex flex-col space-y-3 px-2 py-4 z-10'>
            <div className='flex items-center justify-between'>
                {/* title */}
                <Link href={`#`} className='font-semibold underline'>{proposal.owner.name}</Link>

                {/* actions */}
                
                <div className='flex gap-3'>
                    <Link href={`/my-jobs/employer/proposals/${proposal._id}`} className="border border-green-600 px-4 py-2 rounded w-fit">Review</Link>
 
                    <Link href={'#'} className='px-4 py-2 rounded bg-blue-600 flex items-center gap-2 text-white z-20'>
                        <BsFillCheckCircleFill className='h-5 w-5' />
                        <span>Accept</span>
                    </Link>

                    

                    <button className='px-4 py-2 rounded bg-red-600 flex items-center gap-2 text-white z-20'>
                        <AiOutlineStop className='h-5 w-5' />
                        <span>Reject</span>
                    </button>
                </div>
            </div>
            <p><span className='text-xs text-gray-500 font-medium'>Created on {new Date(proposal.createdAt).toLocaleString()}</span></p>

            <div className='flex items-center justify-between'>
                <div className='flex flex-col w-2/3'>
                    <p className='font-semibold text-sm'>$ {proposal.bid_amount}</p>
                    <p className='text-xs text-gray-500'>Bid Amount</p>
                </div>

                <div className='flex flex-col w-2/3'>
                    <p className='font-semibold text-sm'>{proposal.project_duration}</p>
                    <p className='text-xs text-gray-500'>Duration</p>
                </div>
            </div>

            {/* <p className='text-sm'>{job.description.length > 40 ? `${job.description.slice(0,40)}..` : job.description}</p> */}
        </div>
    )
}