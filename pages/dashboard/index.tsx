import { useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';
import { surveyStore } from '../../lib/stores/survey.store';
import { userStore } from '../../lib/stores/users.store';
import type { SurveyType } from '../../lib/types';
import { GET_SURVEYS } from '../../lib/queries';
import { useQuery } from '@apollo/client';

const Dashboard: NextPage = () => {
  const { surveys, setSurveys } = surveyStore();
  const { authUser } = userStore();

  const { data, loading, error, refetch } = useQuery(GET_SURVEYS, {
    variables: {
      creator: authUser?.email,
    },
  });

  useEffect(() => {
    console.log(data);
    console.log(loading);
    console.log(error);
  }, [data, loading, error]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex ">
        <SideNavbar />

        <div className="md:w-11/12 sm:w-full bg-gray-200 h-screen transition-all">
          <div className="h-full bg-gray-200 container mx-auto p-4">
            <h1>Latests Surveys</h1>

            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">ID</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Title</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Description
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Created At
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {surveys.length > 0 ? (
                      surveys.map((survey) => (
                        <tr key={survey._id}>
                          <td className="p-2 whitespace-nowrap">
                            <span className="text-left">#{survey._id}</span>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <span className="text-left">{survey.title}</span>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {survey.description}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{survey.createdAt}</div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>
                          <div className="text-center hover:underline">
                            No Surveys, Please create one
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo({ ssr: false })(Dashboard);
