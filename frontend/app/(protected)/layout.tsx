import { getUser } from '@/api/authService';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className='flex min-h-screen items-center flex-col'>
            {(children)}
        </div >
    );
}
