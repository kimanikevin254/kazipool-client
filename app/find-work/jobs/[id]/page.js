'use client'

import { useGetAJobQuery } from "@/redux/slice/job/jobApiSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillTrashFill, BsSuitHeart } from "react-icons/bs";
import { IoIosArrowBack } from 'react-icons/io' 
import { useRouter } from 'next/navigation'
import DashLayout from "@/components/dashboard/DashLayout";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import JobDetailsComponent from "@/components/dashboard/find-work/JobDetailsComponent";

export default function Page({ params }) {
    const router = useRouter()

    const { data, isLoading, error } = useGetAJobQuery(params.id)

    const { userInfo } = useSelector((state) => state.auth)

    const applyForTheJob = () => {
        if(data.job.owner === userInfo._id){
            toast.error('You cannot apply your own job')
        }

        router.push(`/find-work/jobs/apply/${data.job._id}`)
    }

    return (
        <DashLayout>
            { 
                isLoading ?

                <div className="flex items-center justify-center">
                    <ClipLoader color="green" />
                </div> :

                (
                    error ?

                        <p>Unable to fetch the job details. Please refresh the page.</p> :
                        <div className="mt-4 p-3 bg-white">
                            <div className="border rounded-3xl py-5 px-8">
                                <JobDetailsComponent data={data} />
                            </div>
                            
                            {
                                data.job.owner === userInfo._id ?

                                <div className="flex w-fit mx-auto mt-4 gap-8">
                                    <Link href={`/my-jobs/employer/edit/${data.job._id}`} className='px-4 py-2 rounded bg-blue-600 flex items-center gap-2 text-white z-20'>
                                        <FaRegEdit className='h-5 w-5' />
                                        <span>Edit</span>
                                    </Link>

                                    <button className='px-4 py-2 rounded bg-red-600 flex items-center gap-2 text-white z-20'>
                                        <BsFillTrashFill className='h-5 w-5' />
                                        <span>Delete</span>
                                    </button>
                                </div> : 
                                // {/* actions */}
                                <div className="flex justify-between mt-4 gap-8">
                                    <button onClick={() => applyForTheJob()} className="w-full bg-green-600 text-white py-3 rounded-full font-semibold">Apply Now</button>
                                    <button className="w-full border-2 border-green-600 rounded-full font-semibold flex items-center justify-center gap-3"><BsSuitHeart color="green" className="h-4 w-4" /> <span>Save Job</span></button>
                                </div>
                            }
                        </div>
                )
            }
        </DashLayout>
    )
  }