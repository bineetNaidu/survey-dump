import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-extrabold">Survey Dump!</h1>
      <i className="font-thin text-stone-500">Dump your survey questions!</i>
    </div>
  );
};

export default Home;
