import CategoryCard from "./CategoryCard"
import { HiMiniComputerDesktop } from 'react-icons/hi2'
import { BsListCheck } from 'react-icons/bs'
import { RiCustomerService2Fill } from 'react-icons/ri'
import { FaHandshakeAngle } from 'react-icons/fa6'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { LuPartyPopper } from 'react-icons/lu'
// import { GrUserWorker } from 'react-icons/gr'
import { RiUser5Fill } from 'react-icons/ri'

export default function JobCategory(){
    const jobCategories = [
        {
            name: 'Information Technology',
            icon: HiMiniComputerDesktop
        },
        {
            name: 'Project Management',
            icon: BsListCheck
        },
        {
            name: 'Customer Service',
            icon: RiCustomerService2Fill
        },
        {
            name: 'Sales and Communication',
            icon: FaHandshakeAngle
        },
        {
            name: 'Business Development',
            icon: MdOutlineBusinessCenter
        },
        {
            name: 'Teaching and Education',
            icon: GiTeacher
        },
        {
            name: 'Design and Creative',
            icon: LuPartyPopper
        },
        {
            name: 'Manual Workers',
            icon: RiUser5Fill
        }
    ]
    return (
        <div className="mt-8">
            <h2 className="text-3xl text-center font-bold mb-12">Available Job Categories</h2>

            <div className="flex gap-12 flex-wrap">
                {
                    jobCategories.map((category, id) => (
                        <CategoryCard key={id} category={category} />
                    ))
                }
            </div>
        </div>
    )
}