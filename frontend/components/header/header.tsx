import Link from "next/link"
import { ProfilePicture } from "../image/profilePicture"
import { SocialButton } from "../base/buttons/social-button"
import { getUser } from "@/api/authService"

export const Header = async () => {
    const user = await getUser()

    return (
        <div className='bg-latte p-1 h-18'>
            <div className='flex min-w-screen justify-between items-center mt-2'>
                <Link href='/'>
                    <h1 className='text-5xl text-white ml-3'>BOOKENDS</h1>
                </Link>
                <div className='mr-4'>
                    {user
                        ? <ProfilePicture src={user.picture} width={50} height={50} alt='User Profile Picture' style="rounded-full" />
                        : <a href={`${process.env.NEXT_PUBLIC_DEV_API_URL}/auth/google`}>
                            <SocialButton social="google" theme="brand">
                                Sign in with Google
                            </SocialButton>
                        </a>}
                </div>
            </div>
        </div >
    )
}