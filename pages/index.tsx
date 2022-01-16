import type { NextPage } from 'next';
import { Navbar } from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto py-4">
      <Navbar />
    </div>
  );
};

export default Home;
