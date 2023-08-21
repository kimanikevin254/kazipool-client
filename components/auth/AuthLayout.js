export default function AuthLayout({ children }) {
  return (
    <div className="max-w-5xl my-8 mx-auto bg-white h-screen overflow-hidden">
        <h1 className="text-center font-semibold text-2xl">KaziPool</h1>

        <div>
            { children }
        </div>
    </div>
  )
}
