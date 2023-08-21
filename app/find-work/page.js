'use client'

import DashLayout from '@/components/dashboard/DashLayout'
import JobCard from '@/components/dashboard/find-work/JobCard'
import { useGetAllJobsQuery } from '@/redux/slice/job/jobApiSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

export default function Home() {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useGetAllJobsQuery()

  useEffect(() => {
  }, [])

  return (
    <DashLayout>
      <div className='border border-gray-200 rounded p-3'>
        <h2 className='text-xl font-bold'>Jobs you might like</h2>
        <p className='text-gray-600 mt-1'>Browse all the available jobs and request the ones that match your relevant experience.</p>

        <div className='divide-y'>
          {
            isLoading ?

            <div className="flex items-center justify-center">
                <ClipLoader color="green" />
            </div> :

            (
              error ?

              <p>Unable to fetch jobs. Please refresh the page.</p> :

              data && data.jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))
            )
          }
        </div>
      </div>
    </DashLayout>
  )
}
