export default function CategoryCard({category}){
    return (
        <div className="w-1/5 p-4 h-36 bg-white shadow space-y-3 hover:border hover:shadow-lg">
            <category.icon className='h-12 w-12 text-green-600'  />
            <p className="font-semibold break-words">{category.name}</p>
        </div>
    )
}