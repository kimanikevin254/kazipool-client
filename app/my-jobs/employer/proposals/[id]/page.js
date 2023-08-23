'use client'

import DashLayout from "@/components/dashboard/DashLayout";
import { useAcceptProposalMutation, useGetProposalQuery } from "@/redux/slice/proposal/proposalApiSlice";
import Link from "next/link";
import { AiOutlineStop } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function ProposalDetailsPage({ params }){
    const { data, isLoading, error } = useGetProposalQuery(params.id)

    const [acceptProposal, { isLoading: isAcceptProposalLoading }] = useAcceptProposalMutation()

    const acceptFreelancerProposal = async () => {
        try {
            const res = await acceptProposal({
                jobId: data.proposal.job._id,
                userId: data.proposal.owner._id,
                proposalId: data.proposal._id
            }).unwrap()

            console.log(res)

            toast.success(res.message || 'Proposal accepted successfully.')
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'Unable to accept the proposal.')
        }
    }

    return (
        <DashLayout>
            <div className="mt-6">
                {
                    isLoading ?

                    <div className="flex items-center justify-center">
                        <ClipLoader color="green" />
                    </div> :

                    (
                        error ?

                        <p>Unable to fetch your jobs. Please reload the page.</p> :

                        <div>
                            <h2 className="text-lg font-semibold text-center">{data.proposal.job.title} - Proposal</h2>
                        
                            <div className="mt-3 rounded border divide-y">
                                {
                                    data && (
                                        <div className='flex flex-col space-y-4 px-2 py-4 z-10'>
                                            <div className='flex items-center justify-between'>
                                                {/* title */}
                                                <Link href={`#`} className='font-semibold underline'>{data.proposal.owner.name}</Link>

                                                {/* actions */}
                                                
                                                <div className='flex gap-3'>                                
                                                    <button onClick={() => acceptFreelancerProposal()} className='px-4 py-2 rounded bg-blue-600 flex items-center gap-2 text-white z-20'>
                                                        <BsFillCheckCircleFill className='h-5 w-5' />
                                                        <span>Accept</span>
                                                    </button>

                                                    

                                                    <button className='px-4 py-2 rounded bg-red-600 flex items-center gap-2 text-white z-20'>
                                                        <AiOutlineStop className='h-5 w-5' />
                                                        <span>Reject</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <p><span className='text-xs text-gray-500 font-medium'>Created on {new Date(data.proposal.createdAt).toLocaleString()}</span></p>

                                            <div className='flex items-center justify-between'>
                                                <div className='flex flex-col w-2/3'>
                                                    <p className='font-semibold text-sm'>$ {data.proposal.bid_amount}</p>
                                                    <p className='text-xs text-gray-500'>Bid Amount</p>
                                                </div>

                                                <div className='flex flex-col w-2/3'>
                                                    <p className='font-semibold text-sm'>{data.proposal.project_duration}</p>
                                                    <p className='text-xs text-gray-500'>Duration</p>
                                                </div>
                                            </div>

                                            <div className="">
                                                <h2 className="font-bold">Cover Letter</h2>
                                                <p className='text'>{data.proposal.cover_letter}</p>
                                            </div>
                                        </div>
                                    
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </DashLayout>
    )
}