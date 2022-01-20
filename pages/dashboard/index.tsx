import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';
import { surveyStore } from '../../lib/stores/survey.store';
import { userStore } from '../../lib/stores/users.store';
import type { SurveyType } from '../../lib/types';
import { GET_SURVEYS, CREATE_SURVEY } from '../../lib/queries';
import { useQuery, useMutation } from '@apollo/client';
import { CreateSurveyModal } from '../../components/CreateSurveyModal';
import { getCreatedAt } from '../../lib/utils';
import { nanoid } from 'nanoid';

const Dashboard: NextPage = () => {
  const { surveys, setSurveys, addSurvey } = surveyStore();
  const { authUser } = userStore();
  const [show, setShow] = useState(false);
  const [createSurvey] = useMutation(CREATE_SURVEY);

  const { data, loading, error, refetch } = useQuery(GET_SURVEYS, {
    variables: {
      creator: authUser?.email,
    },
  });

  useEffect(() => {
    console.log(data);
    console.log(loading);
    console.log(error);
    if (data) {
      setSurveys(data.getSurveys.data);
    }
  }, [data, loading, error, setSurveys]);

  const handleCreateSurveySubmit = async (
    title: string,
    description: string
  ) => {
    try {
      if (!authUser) throw new Error('User not authenticated');
      const obj = {
        title,
        description,
        questions: [],
        creator: authUser.email as any,
        createdAt: getCreatedAt(),
        status: 'DRAFT',
        slug: nanoid(),
      };
      const { data } = await createSurvey({
        variables: { data: obj },
      });
      console.log(`Created survey: ${JSON.stringify(data, null, 2)}`);
      const { createSurvey: newSurvey } = data;
      if (newSurvey) {
        addSurvey(newSurvey);
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex ">
        <SideNavbar />
        {authUser && (
          <CreateSurveyModal
            show={show}
            setShow={setShow}
            handleCreateSurveySubmit={handleCreateSurveySubmit}
          />
        )}
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
                            <span className="text-left">
                              {survey.description}
                            </span>
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
                    <tr>
                      <td colSpan={3}>
                        <div
                          className="flex justify-center items-center mt-2"
                          onClick={() => setShow(true)}
                        >
                          <button className="border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-400 hover:text-blue-400 transition-all py-2 px-4 rounded ">
                            Add Survey
                          </button>
                        </div>
                      </td>
                    </tr>
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
