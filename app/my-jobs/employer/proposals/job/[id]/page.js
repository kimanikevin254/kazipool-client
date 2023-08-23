'use client'

import DashLayout from "@/components/dashboard/DashLayout";
import ProposalCard from "@/components/dashboard/my-jobs/employer/ProposalCard";
import { useGetJobProposalsQuery } from "@/redux/slice/proposal/proposalApiSlice";
import { ClipLoader } from "react-spinners";

export default function MyJobProposals({ params }){
    const { data, isLoading, error } = useGetJobProposalsQuery(params.id)

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
                            <h2 className="text-lg font-semibold text-center">{data.job.title} - Proposals</h2>
                        
                            <div className="mt-3 rounded border divide-y">
                                {
                                    data && data.proposals.map(proposal => (
                                        <ProposalCard key={proposal._id} proposal={proposal} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </DashLayout>
    )
}