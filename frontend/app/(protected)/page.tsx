import { getUser } from '../../api/authService';
import DashboardView from '../DashboardView';

export default async function Home() {
  const { user } = await getUser();

  return <DashboardView displayName={user ? user.displayName : ''} />;
}
