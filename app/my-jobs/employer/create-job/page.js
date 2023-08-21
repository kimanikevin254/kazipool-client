'use client'

import DashLayout from "@/components/dashboard/DashLayout";
import { useCreateJobMutation } from "@/redux/slice/job/jobApiSlice";
import { dropdown_options } from "@/utils/dropdown-options";
import { useFormik } from "formik"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from 'yup'

export default function CreateJob(){
    const router = useRouter()
    const [createJob, { isLoading }] = useCreateJobMutation()

    const create_employer_job = async (values, actions) => {
        try {
            // Remove spaces after commas if they exist
            const stringWithoutSpaces = values.skills.replace(/,\s+/g, ',')

            // Split the modified string by commas
            const skillsArray = stringWithoutSpaces.split(',');

            const res = await createJob({
                title: values.title,
                type: values.type,
                compensation: values.compensation,
                category: values.category,
                description: values.description,
                skill_level: values.skill_level,
                skills: skillsArray
            }).unwrap()

            toast.success('Job created successfully!')

            router.push('/my-jobs/employer')
        } catch (err) {
            toast.error(err?.data?.message || 'Unable to create the Job. Please try again later.')
        }
    }

    // validation schema
    const jobSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        type: yup.string().oneOf(dropdown_options.job_type_options, 'Please select a valid job type').required('Job type is required'),
        compensation: yup.mixed().test('is-number', 'Must be a number', value => {
            return typeof value === 'number' || !isNaN(parseFloat(value));
          }).required('Compensation amount is required'),
        category: yup.string().oneOf(dropdown_options.job_categories_options, 'Please select a valid job category').required('Category is required'),
        description: yup.string().required('Description is required'),
        skill_level: yup.string().oneOf(dropdown_options.skill_level_options, 'Please select a valid skill level').required('Skill level is required'),
        skills: yup.string().required('Skills are required')
    })

    // formik form validation
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            title: '',
            type: '',
            compensation: '',
            category: '',
            description: '',
            skill_level: '',
            skills: ''
        },
        validationSchema: jobSchema,
        onSubmit: create_employer_job
    })
    return (
        <DashLayout>
            <div>
                <h2 className="font-bold text-xl text-center">Create a Job</h2>

                <form onSubmit={handleSubmit} className="w-full mt-8 space-y-4">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Title
                        </label>
                        <input 
                            className={errors.title && touched.title ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                            type="text" 
                            id="title" 
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.title && errors?.title && (<p className="text-red-500 text-sm">{errors.title}</p>)}
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Category
                            </label>
                            <select 
                                className={errors.category && touched.category ? "appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                id="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select the Job Category</option>
                                {
                                    dropdown_options.job_categories_options.map((option, id) => (
                                        <option key={id} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                            {touched.category && errors?.category && (<p className="text-red-500 text-sm">{errors.category}</p>)}
                        </div>
                        <div className="w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Type
                            </label>
                            <select 
                                className={errors.type && touched.type ? "appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                id="type"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select the Job Type</option>
                                {
                                    dropdown_options.job_type_options.map((option, id) => (
                                        <option key={id} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                            {touched.type && errors?.type && (<p className="text-red-500 text-sm">{errors.type}</p>)}
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Skill Level
                            </label>
                            <select 
                                className={errors.skill_level && touched.skill_level ? "appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                id="skill_level"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select the Required Skill Level</option>
                                {
                                    dropdown_options.skill_level_options.map((option, id) => (
                                        <option key={id} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                            {touched.skill_level && errors?.skill_level && (<p className="text-red-500 text-sm">{errors.skill_level}</p>)}
                        </div>
                        <div className="w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Compensation (in USD)
                            </label>
                            <input 
                                className={errors.compensation && touched.compensation ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                                type="text" 
                                id="compensation" 
                                value={values.compensation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.compensation && errors?.compensation && (<p className="text-red-500 text-sm">{errors.compensation}</p>)}
                        </div>
                    </div>

                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Skills
                        </label>
                        <p className="text-sm text-gray-600 mb-1">If several, make sure they are separated by commas. For example: web, android</p>
                        <input 
                            className={errors.skills && touched.skills ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                            type="text" 
                            id="skills" 
                            value={values.skills}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.skills && errors?.skills && (<p className="text-red-500 text-sm">{errors.skills}</p>)}
                    </div>

                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Description
                        </label>
                        <textarea 
                            className={errors.description && touched.description ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                            id="description" 
                            rows="10"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        {touched.description && errors?.description && (<p className="text-red-500 text-sm">{errors.description}</p>)}
                    </div>

                    <div className="flex items-center justify-center mt-3">
                        <button 
                            className='bg-green-600 rounded-full py-2 px-16 font-semibold text-white text-lg'
                            type="submit"
                        >
                            Create Job
                        </button>
                    </div>
                </form>
            </div>
        </DashLayout>
    )
}