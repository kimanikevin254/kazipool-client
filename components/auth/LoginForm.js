'use client'

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "@/redux/slice/user/usersApiSlice"
import { setCredentials } from "@/redux/slice/user/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Link from "next/link"

export default function LoginForm(){
    const dispatch = useDispatch()
    const router = useRouter()

    const [signin, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo){
            router.push('/find-work')
        }
    }, [userInfo])

    // register the user
    const login = async (values, actions) => {
        try {
            const res = await signin({
                email: values.email,
                password: values.password,
            }).unwrap() //unwrap the promise

            dispatch(setCredentials({...res}))
        } catch (err) {
            toast.error(err?.data?.message);
        }
    }

    // password regex
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/ // min 6 characters, 1 upper case, one lower case, 1 numeric digit

    // validation schema
    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        // password: yup.string().min(6, 'Password must be at least 6 characters').matches(passwordRules, { message: 'Password must contain a minimum 6 characters, 1 upper case, 1 lower case, 1 numeric digit'}).required('Password is required'),
    })

    // formik form validation
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '1234Kim.',
        },
        validationSchema: loginSchema,
        onSubmit: login
    })

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-4">
            <div className="flex flex-wrap -mx-3 mb-6 gap-4">
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
            </div>

            <div className="flex flex-col items-center mb-6 space-y-3">
                <button className="text-center font-semibold text-green-600">Forgot password?</button>

                <Link href={'/auth/signup'} className=" flex gap-1 cursor-pointer">
                    <span>New user?</span><span className="text-green-600">Register.</span>
                </Link>
            </div>

            <button 
                className='bg-green-600 w-full rounded-full py-2 font-semibold text-white text-lg'
                type="submit"
            >
                Log in
            </button>
        </form>
    )
}