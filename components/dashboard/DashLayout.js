import { useDispatch, useSelector } from "react-redux";
import DashNav from "./DashNav";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setIsLoading } from "@/redux/slice/user/authSlice";
import { BounceLoader } from "react-spinners";

export default function DashLayout({ children }){
    const dispatch = useDispatch()
    const router = useRouter()
    const { userInfo } = useSelector((state) => state.auth)

    // loading state to avoid a flash of the dashboard for unauthenticated users
    const { isLoading } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!userInfo){
            router.replace('/auth/login')
        } else {
            dispatch(setIsLoading())
        }
    }, [userInfo, router, dispatch])

    if (isLoading) {
        return <div className="h-screen w-screen overflow-hidden flex items-center justify-center"> 
            <div className="flex flex-col items-center space-y-6">
                <BounceLoader color="green" /> 
                <h2 className="font-bold text-green-600">Authenticating...</h2>
            </div>
        </div> // Render a loading state while authentication check is in progress
      }

    return (
        <div className="max-w-5xl mx-auto bg-white p-4">
            <DashNav />

            <div className="w-4/5 mx-auto mt-4 p-3">
                { children }
            </div>
        </div>
    )
}