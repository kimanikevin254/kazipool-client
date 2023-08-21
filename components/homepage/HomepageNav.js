import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function HomepageNav(){
    return (
        <div className="flex justify-between items-center bg-white">
            {/* logo */}
            <h1 className="text-green-600 font-extrabold text-2xl px-4">KaziPool</h1>

            {/* links */}
            <div className="flex items-center space-x-4">
                <Link href={'#'} className="">HOME</Link>
                <Link href={'#'} className="">ABOUT</Link>
                <Link href={'#'} className="">CONTACT</Link>
                <Link href={'/auth/login'} className="px-10 py-6 bg-green-600 font-semibold text-white flex items-center space-x-2"> <span>Get Started</span><IoArrowForwardOutline /></Link>
            </div>
        </div>
    )
}