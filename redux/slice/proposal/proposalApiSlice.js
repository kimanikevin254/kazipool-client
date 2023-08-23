import { apiSlice } from "../apiSlice";

const PROPOSAL_URL = '/jobs/create_proposal'

export const proposalApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createProposal: builder.mutation({
            query: (data) => ({
                url: PROPOSAL_URL,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
    })
})

export const { useCreateProposalMutation } = proposalApiSlice

