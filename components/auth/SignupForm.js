'use client'

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "@/redux/slice/user/usersApiSlice"
import { setCredentials } from "@/redux/slice/user/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Link from "next/link"

export default function SignupForm(){
    const dispatch = useDispatch()
    const router = useRouter()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo){
            // console.log('Registered and authenticated')
            router.replace('find-work')
        }
    }, [userInfo])

    // register the user
    const signup = async (values, actions) => {
        try {
            const res = await register({
                name: `${values.firstName} ${values.lastName}`,
                username: values.username,
                email: values.email,
                password: values.password,
                country: values.country
            }).unwrap() //unwrap the promise

            dispatch(setCredentials({...res}))
        } catch (err) {
            toast.error(err?.data?.message);
        }
    }

    // password regex
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/ // min 6 characters, 1 upper case, one lower case, 1 numeric digit

    // validation schema
    const registerSchema = yup.object().shape({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').matches(passwordRules, { message: 'Password must contain a minimum 6 characters, 1 upper case, 1 lower case, 1 numeric digit'}).required('Password is required'),
        // confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
        country: yup.string().required('Country is required')
    })

    // formik form validation
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '1234Kim.',
            // confirmPassword: '',
            country: ''
        },
        validationSchema: registerSchema,
        onSubmit: signup
    })

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-4">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        First Name
                    </label>
                    <input 
                        className={errors.firstName && touched.firstName ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                        type="text"
                        id="firstName" 
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.firstName && errors?.firstName && (<p className="text-red-500 text-sm">{errors.firstName}</p>)}
                </div>
                <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Last Name
                    </label>
                    <input 
                        className={errors.lastName && touched.lastName ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                        type="text" 
                        id="lastName" 
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.lastName && errors?.lastName && (<p className="text-red-500 text-sm">{errors.lastName}</p>)}
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6 gap-4">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Username
                    </label>
                    <input 
                        className={errors.username && touched.username ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                        type="text" 
                        id="username" 
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.username && errors?.username && (<p className="text-red-500 text-sm">{errors.username}</p>)}
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                    </label>
                    <input 
                        className={errors.email && touched.email ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                        type="email" 
                        id="email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors?.email && (<p className="text-red-500 text-sm">{errors.email}</p>)}
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Password
                    </label>
                    <input 
                        className={errors.password && touched.password ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                        type="password" 
                        id="password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors?.password && (<p className="text-red-500 text-sm">{errors.password}</p>)}
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Country
                    </label>
                    <input 
                        className={errors.country && touched.country ? "appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none" : "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"} 
                        type="text" 
                        id="country" 
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.country && errors?.country && (<p className="text-red-500 text-sm">{errors.country}</p>)}
                </div>
            </div>

            <div className="flex items-center justify-center mb-4">
                <Link href={'/auth/login'} className="flex gap-1 cursor-pointer">
                    <span>Already have an account?</span><span className="text-green-600">Log in.</span>
                </Link>
            </div>

            <button 
                className='bg-green-600 w-full rounded-full py-2 font-semibold text-white text-lg'
                type="submit"
            >
                Create my account
            </button>
        </form>
    )
}