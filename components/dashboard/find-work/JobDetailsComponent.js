export default function JobDetailsComponent({ data }){
    return (
        <div className="">
            <h1 className="font-semibold text-xl">{data.job.title}</h1>

            <div className="divide-y">
                <div className="mt-3 space-y-2 py-3">
                    <h3 className="text-green-600 font-semibold">{data.job.category.title}</h3>
                    <p className="text-gray-500">Posted on: {new Date(data.job.createdAt).toLocaleString()}</p>
                </div>

                <p className="py-3 text-sm">{data.job.description}</p>

                <div className="py-3 flex gap-32">
                    <div>
                        <p className="font-semibold text-sm">{data.job.compensation}</p>
                        <p className="text-sm text-gray-500">Fixed-price</p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{data.job.skill_level.charAt(0).toUpperCase() + data.job.skill_level.slice(1)}</p>
                        <p className="text-sm text-gray-500 w-40">I am looking for a mix of experience and value</p>
                    </div>
                </div>

                <p className="py-3 space-x-2">
                    <span className="font-semibold">Project type:</span>
                    <span className="text-gray-600">{data.job.type.charAt(0).toUpperCase() + data.job.type.slice(1)}</span>
                </p>

                <div className="py-3">
                    <h4 className="font-semibold">Skills and Expertise</h4>
                    <div className="space-x-3 mt-2">
                        {
                            data.job.skills.map((skill, id) => (
                                <span key={id} className="bg-gray-200 py-2 px-4 rounded-full">{skill}</span>
                            ))
                        }
                    </div>
                </div>

                <div className="py-3 mt-1">
                    <h4 className="font-semibold">Activity on the job</h4>
                    <div className="mt-1">
                        <p className="text-gray-500"><span>Proposals: </span><span>{data.job.proposals.length}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}