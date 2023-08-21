import Carousel from "@/components/homepage/Carousel";
import Footer from "@/components/homepage/Footer";
import HomepageNav from "@/components/homepage/HomepageNav";
import JobCategory from "@/components/homepage/JobCategory";
import MoreInfo from "@/components/homepage/MoreInfo";
import Testimonials from "@/components/homepage/Testimonials";


export default function Homepage(){
    return (
        <div className="">
            <div className="max-w-5xl mx-auto bg-white">
                <HomepageNav />
                <Carousel />
                <JobCategory />
                <MoreInfo />
                <Testimonials />
                <Footer />
            </div>
        </div>
    )
}