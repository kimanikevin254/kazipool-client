import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function Page() {
    return (
        <AuthLayout>
            <div className='flex flex-col space-y-8 items-center mt-12 w-fit mx-auto border border-gray-200 p-6 rounded-lg'>
                <h2 className='font-semibold text-xl italic'>Log in to Kazipool</h2>
                <LoginForm />
            </div>
        </AuthLayout>
    )
}