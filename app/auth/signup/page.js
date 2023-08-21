import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function Page() {
    return (
        <AuthLayout>
            <div className='flex flex-col space-y-8 items-center mt-12 w-fit mx-auto border border-gray-200 p-6 rounded-lg'>
                <h2 className='font-semibold text-xl italic'>Sign up to find work or talent</h2>
                <SignupForm />
            </div>
        </AuthLayout>
    )
}