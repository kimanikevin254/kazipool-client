import Image from "next/image";
// import hero1 from '@/assets/hero1.jpg'
import { BiCheck } from 'react-icons/bi'

export default function MoreInfo(){
    return (
        <div className="mt-28 flex justify-center gap-8">
            <img src='/assets/hero1.jpg' alt="Hero image" className="h-96 w-96 object-cover border" />

            <div className="w-1/2 flex flex-col justify-center">
                <h2 className="font-bold text-4xl">We Help You Get The Best Job And Exceptional Talents</h2>
                <p className="mt-4 text-gray-600">Empowering job seekers and employers alike, we bridge the gap between exceptional talents and the best job opportunities available.</p>
                <div className="mt-4">
                    <div className="flex space-x-2 items-center">
                        <BiCheck className="text-green-600 font-bold h-6 w-6" />
                        <p className="text-gray-600">Top Talent</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <BiCheck className="text-green-600 font-bold h-6 w-6" />
                        <p className="text-gray-600">Great Opportunities</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <BiCheck className="text-green-600 font-bold h-6 w-6" />
                        <p className="text-gray-600">Guaranteed Quality</p>
                    </div>
                </div>
            </div>
        </div>
    )
}