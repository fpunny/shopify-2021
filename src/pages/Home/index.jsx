import SessionProvider from '../../components/SessionProvider';
import Search from './Search';

export default function Home() {
  return (
    <SessionProvider>
      <Search />
    </SessionProvider>
  );
}
