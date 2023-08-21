import TestimonyCard from "./TestimonyCard"

export default function Testimonials(){
    let testimonies = [
        {
            name: "John Doe",
            text: "This platform transformed my job search. Within days, I found my dream role that perfectly matched my skills and aspirations. Highly recommended!"
        },
        {
            name: "Jane Doe",
            text: "As an employer, I was impressed by the diverse range of talents this platform offers. It's a goldmine for discovering skilled professionals who fit our company culture."        
        },
        {
            name: "Jessica D.",
            text: "I'm thrilled with the results from using this platform. I secured a fantastic job opportunity that matched my career goals and offered great benefits."
        }
    ]
    return (
        <div className="my-16">
            <h2 className="text-3xl text-center font-bold">What Our Clients Say</h2>

            <div className="flex space-x-8">
                {
                    testimonies.map((testimony, id) => (
                        <TestimonyCard key={id} testimony={testimony} />
                    ))   
                }
            </div>
        </div>
    )
}