import Search from '../search/search';

export default async function Home() {
    return (<div className='flex min-h-screen items-center flex-col'>
        <Search />
    </div>
    );
}
