'use client'

import DashLayout from "@/components/dashboard/DashLayout";
import JobDetailsComponent from "@/components/dashboard/find-work/JobDetailsComponent";
import { useGetAJobQuery } from "@/redux/slice/job/jobApiSlice";
import { useCreateProposalMutation } from "@/redux/slice/proposal/proposalApiSlice";
import { dropdown_options } from "@/utils/dropdown-options";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { BsInfoCircle } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as yup from 'yup'

export default function ApplyJob({ params }){
    const router = useRouter()

    const { data, isLoading, error } = useGetAJobQuery(params.id)

    const [saveProposal, { loading }] = useCreateProposalMutation()

    const saveJobProposal = async (values, actions) => {
        const { bid_amount, project_duration, cover_letter } = values
        try {
            const res  = await saveProposal({
                jobId: params.id, 
                bid_amount,
                project_duration,
                cover_letter
            })

            toast.success('Proposal sent successfully')
            router.back()
        } catch (error) {
            console.error(error)
            toast.error(error?.message || 'Unable to send the proposal. Please try again later.')
        }
    }

    // validation schema
    const proposalSchema = yup.object().shape({
        bid_amount: yup.mixed().test('is-number', 'Must be a number', value => {
            return typeof value === 'number' || !isNaN(parseFloat(value));
          }).required('Required'),
        project_duration: yup.string().oneOf(dropdown_options.project_duration, 'Invalid duration').required('Required'),
        cover_letter: yup.string().required('Cover letter is required'),
    })

    // formik form validation
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            bid_amount: '',
            project_duration: '',
            cover_letter: ''
        },
        validationSchema: proposalSchema,
        onSubmit: saveJobProposal
    })
    return (
        <DashLayout>
            <div className="p-3">
                <h2 className="font-bold text-2xl">Submit a Proposal</h2>
                { 
                    isLoading ?

                    <div className="flex items-center justify-center">
                        <ClipLoader color="green" />
                    </div> :

                    (
                        error ?

                            <p>Unable to fetch the job details. Please refresh the page.</p> :
                            <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-white">
                                <div className="border rounded-3xl py-5 px-8 space-y-6">
                                    <h3 className="font-bold text-2xl">Job Details</h3>
                                    <JobDetailsComponent data={data} />
                                </div>

                                <div className="border rounded-3xl py-5 px-8 space-y-6">
                                    <h3 className="font-bold text-2xl">Terms</h3>

                                    <p className="bg-green-100 p-2 rounded flex items-center gap-2">
                                        <BsInfoCircle />
                                        <span className="text-sm">You will get the entire payment when all work has been delivered.</span>                                       
                                    </p>

                                    <div className="space-y-3">
                                        <p className="font-semibold">What is the full amount you would like to bid for this job?</p>
                                        <div className="flex items-center gap-16">
                                            <div className="flex-1">
                                                <h5 className="font-semibold">Bid</h5>
                                                <p className="text-sm text-gray-500">Total amount the client will see on your proposal</p>
                                            </div>
                                            <div>
                                                <input 
                                                    className={errors.bid_amount && touched.bid_amount ? "appearance-none block bg-white text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                                    id="bid_amount" 
                                                    type="text" 
                                                    placeholder="In USD"
                                                    value={values.bid_amount}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.bid_amount && errors?.bid_amount && (<p className="text-red-500 text-sm">{errors.bid_amount}</p>)}
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="space-y-3">
                                            <p className="font-semibold">How long will this project take?</p>

                                            <select 
                                                className={errors.project_duration && touched.project_duration ? "appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                                id="project_duration"
                                                value={values.project_duration}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="">Select a duration</option>
                                                {
                                                    dropdown_options.project_duration.map((option, id) => (
                                                        <option key={id} value={option}>{option}</option>
                                                    ))
                                                }
                                            </select>
                                            {touched.project_duration && errors?.project_duration && (<p className="text-red-500 text-sm">{errors.project_duration}</p>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-3xl py-5 px-8 space-y-6">
                                    <h3 className="font-bold text-2xl">Cover Letter</h3>
                                    <textarea 
                                        className={errors.cover_letter && touched.cover_letter ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                        id="cover_letter" 
                                        rows="10"
                                        value={values.cover_letter}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></textarea>
                                    {touched.cover_letter && errors?.cover_letter && (<p className="text-red-500 text-sm">{errors.cover_letter}</p>)}
                                </div>

                                <div className="flex gap-8">
                                    <button 
                                        className='bg-green-600 rounded-full py-2 px-16 font-semibold text-white text-lg'
                                        type="submit"
                                    >
                                        Submit Proposal
                                    </button>

                                    <button 
                                        className='text-red-600 rounded-full py-2 px-16 font-semibold text-lg border border-red-600'
                                        type="cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                    )
                }
            </div>
        </DashLayout>
    )
}