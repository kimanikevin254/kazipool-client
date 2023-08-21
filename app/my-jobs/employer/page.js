'use client'

import DashLayout from "@/components/dashboard/DashLayout";
import JobCard from "@/components/dashboard/find-work/JobCard";
import { useGetMyJobsQuery } from "@/redux/slice/job/jobApiSlice";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function EmployerJobs(){
    const { data, error, isLoading } = useGetMyJobsQuery()
    return (
        <DashLayout>
            <div>
                {/* Create A job */}
                <div className="flex justify-end">
                    <Link href={'employer/create-job'} className="bg-green-600 text-white font-semibold px-6 py-2 cursor-pointer">Create A Job</Link>
                </div>

                {/* Employer Jobs */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-center">Your Jobs</h2>

                    {
                        isLoading ?

                        <div className="flex items-center justify-center">
                            <ClipLoader color="green" />
                        </div> :

                        (
                            error ?

                            <p>Unable to fetch your jobs. Please reload the page.</p> :
                            
                            <div className="mt-3 rounded border divide-y">
                                {
                                    data && data.jobs.map(job => (
                                        <JobCard key={job._id} job={job} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </DashLayout>
    )
}