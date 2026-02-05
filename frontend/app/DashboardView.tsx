import Link from "next/link";
import SearchBar from "./search/searchBar";

export default function DashboardView({
  displayName,
}: {
  displayName: string;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1>Welcome {displayName}!</h1>
      <Link href={'/shelf'}>Shelf</Link>
      <SearchBar />
    </div>
  );
}
