'use client'

import DashLayout from "@/components/dashboard/DashLayout";
import FreelancerJobCard from "@/components/dashboard/my-jobs/freelancer/FreelancerJobCard";
import { useGetJobsAssignedToMeQuery } from "@/redux/slice/job/jobApiSlice";
import { ClipLoader } from "react-spinners";

export default function JobsAssignedToMe(){
    const { data, isLoading, error } = useGetJobsAssignedToMeQuery()
    return (
        <DashLayout>
            <h2 className="text-lg font-semibold text-center">Jobs Assigned To You</h2>

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
                            data && data.map(job => (
                                <FreelancerJobCard key={job._id} job={job} />
                            ))
                        }
                    </div>
                )
            }
        </DashLayout>
    )
}