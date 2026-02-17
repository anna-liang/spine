import { getUser } from '../../api/authService';
import { SocialButton } from '@/components/base/buttons/social-button';
import SearchBar from '../search/searchBar';
import { ProfilePicture } from '@/components/image/profilePicture';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();

  return (
    <div className='flex min-h-screen items-center flex-col'>
      <div className='bg-latte'>
        <div className='flex min-w-screen justify-center mt-2 mb-3'>
          <h1 className='text-6xl text-white'>BOOKENDS</h1>
          <div className='absolute right-4 top-3'>
            {user ? <ProfilePicture src={user.picture} width={55} height={55} alt='User Profile Picture' style="rounded-full" /> : <a href={`${process.env.NEXT_PUBLIC_DEV_API_URL}/auth/google`}>
              <SocialButton social="google" theme="brand" className='top-1'>
                Sign in with Google
              </SocialButton>
            </a>}
          </div>
        </div>
      </div >
      <SearchBar />
      {user ? (children) : <div></div>}
    </div >
  );
}
