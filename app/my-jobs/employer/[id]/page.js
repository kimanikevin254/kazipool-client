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

export default function JObDetails({ params }) {
    const router = useRouter()

    const { data, isLoading, error } = useGetAJobQuery(params.id)

    const { userInfo } = useSelector((state) => state.auth)

    const applyForTheJob = () => {
        if(data.job.owner === userInfo._id){
            toast.error('You cannot apply your own job')
        }
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
                                {/* My Job: {params.id} */}
                                {/* job details */}
                                <div className="">
                                    <h1 className="font-semibold text-xl">{data.job.title}</h1>

                                    <div className="divide-y">
                                        <div className="mt-3 space-y-2 py-3">
                                            <h3 className="text-green-600 font-semibold">{data.job.category.title}</h3>
                                            <p className="text-gray-500">Posted on: {new Date(data.job.createdAt).toLocaleString()}</p>
                                        </div>

                                        <p className="py-3 text-sm">{data.job.description}</p>

                                        <div className="py-3 flex gap-32">
                                            <div>
                                                <p className="font-semibold text-sm">$ {data.job.compensation}</p>
                                                <p className="text-sm text-gray-500">Fixed-price</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{data.job.skill_level.charAt(0).toUpperCase() + data.job.skill_level.slice(1)}</p>
                                                <p className="text-sm text-gray-500 w-40">I am looking for a mix of experience and value</p>
                                            </div>
                                        </div>

                                        <p className="py-3 space-x-2">
                                            <span className="font-semibold">Project type:</span>
                                            <span className="text-gray-600">{data.job.type.charAt(0).toUpperCase() + data.job.type.slice(1)}</span>
                                        </p>

                                        <div className="py-3">
                                            <h4 className="font-semibold">Skills and Expertise</h4>
                                            <div className="space-x-3 mt-2">
                                                {
                                                    data.job.skills.map((skill, id) => (
                                                        <span key={id} className="bg-gray-200 py-2 px-4 rounded-full">{skill}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="py-3 mt-1">
                                            <h4 className="font-semibold">Activity on the job</h4>
                                            <div className="mt-1">
                                                <p className="text-gray-500"><span>Proposals: </span><span>20 to 50</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex w-fit mx-auto mt-8 gap-6">
                                <Link href={`/my-jobs/employer/edit/${data.job._id}`} className='px-4 py-2 rounded bg-blue-600 flex items-center gap-2 text-white z-20'>
                                    <FaRegEdit className='h-5 w-5' />
                                    <span>Edit</span>
                                </Link>

                                <button className='px-4 py-2 rounded bg-red-600 flex items-center gap-2 text-white z-20'>
                                    <BsFillTrashFill className='h-5 w-5' />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                )
            }
        </DashLayout>
    )
  }