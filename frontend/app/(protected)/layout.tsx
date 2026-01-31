import { getUser } from '../../api/authService';
import { SocialButton } from '@/components/base/buttons/social-button';
import SearchBar from '../search/searchBar';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();

  return user ? (
    children
  ) : (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <a href={`${process.env.NEXT_PUBLIC_DEV_API_URL}/auth/google`}>
        <SocialButton social="google" theme="brand">
          Sign in with Google
        </SocialButton>
      </a>
      <SearchBar />
    </div>
  );
}
