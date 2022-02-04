import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';
import { useSurveyStore } from '../../lib/stores/survey.store';
import { useUserStore } from '../../lib/stores/users.store';
import { MultiStepModal } from '../../components/MultiStepModal';
import { IoMdSettings } from 'react-icons/io';
import { FiExternalLink } from 'react-icons/fi';
import { useGetSurveysQuery } from '../../lib/graphql';
import { SurveyModal } from '../../components/SurveyModal';
import type { BaseSurveyType } from '../../lib/types';
import Link from 'next/link';

const Dashboard: NextPage = () => {
  const {
    surveys,
    setSurveys,
    selectedSurvey,
    clearSelectedSurveyState,
    setSelectedSurveyState,
  } = useSurveyStore();
  const { authUser } = useUserStore();
  const [show, setShow] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  const { data: surveyData } = useGetSurveysQuery();

  useEffect(() => {
    if (surveyData) {
      setSurveys(surveyData.getSurveys);
    }
  }, [surveyData, setSurveys]);

  const handleShowSurveyModal = (s: BaseSurveyType) => {
    setSelectedSurveyState(
      {
        _id: s._id,
        title: s.title,
        description: s.description,
        status: s.status,
        creator: s.creator,
      },
      s.questions
    );
    setShowSurveyModal(true);
  };
  const handleCloseSurveyModal = () => {
    clearSelectedSurveyState();
    setShowSurveyModal(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex">
        <SideNavbar />
        {authUser && (
          <>
            {selectedSurvey && (
              <SurveyModal
                handleCloseSurveyModal={handleCloseSurveyModal}
                show={showSurveyModal}
                setShow={setShowSurveyModal}
              />
            )}
            <MultiStepModal show={show} setShow={setShow} />
          </>
        )}
        <div className="md:w-11/12 sm:w-full bg-gray-200 min-h-screen h-full transition-all">
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
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Status</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Actions</div>
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
                            <div className="text-left">
                              12-12-12
                              {/* {survey.createdAt} */}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{survey.status}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex w-full justify-evenly items-center">
                              <Link href={`/surveys/${survey.slug}`}>
                                <a className="h-8 w-8 text-sm text-blue-500 p-2 rounded border border-blue-500 hover:text-white hover:bg-orange-500 hover:border-transparent transition-all">
                                  <FiExternalLink />
                                </a>
                              </Link>
                              <button
                                className="h-8 w-8 text-sm text-blue-500 p-2 rounded border border-blue-500 hover:text-white hover:bg-green-500 hover:border-transparent transition-all"
                                onClick={() => handleShowSurveyModal(survey)}
                              >
                                <IoMdSettings />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <div className="text-center hover:underline">
                            No Surveys, Please create one
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={6}>
                        <div className="flex justify-center items-center mt-2">
                          <button
                            className="border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-400 hover:text-blue-400 transition-all py-2 px-4 rounded "
                            onClick={() => setShow(true)}
                          >
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

export default withApollo({ ssr: true })(Dashboard);
