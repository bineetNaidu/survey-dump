import { NextPage } from 'next';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';

const Dashboard: NextPage = () => {
  return (
    <div className="flex ">
      {/* SideNav */}
      <SideNavbar />

      {/* Main */}
      <div className="md:w-11/12 sm:w-full bg-gray-200 h-screen transition-all">
        <div className="h-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(Dashboard);
