import Head from 'next/head';
import { NextPage } from 'next';
import { withApollo } from '../../lib/nextApollo';
import { useGetSurveyBySlugQuery } from '../../lib/graphql';
import { useRouter } from 'next/router';

const SurveyPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading } = useGetSurveyBySlugQuery({
    variables: {
      slug: slug as string,
    },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!(data && data.getSurveyBySlug)) {
    return <div>No Survey</div>;
  }
  const survey = data.getSurveyBySlug;

  return (
    <>
      <Head>
        <title>
          {survey.title} | {survey.description}{' '}
        </title>
        <meta name="description" content={survey.description} />
      </Head>
      <div className="bg-blue-50 h-full min-h-screen w-full py-4">
        <main className="flex flex-col items-center mx-auto">
          <div className="flex flex-col text-center">
            <h1 className="text-6xl font-bold text-blue-600">{survey.title}</h1>
            <p className="text-gray-600 italic mt-2">{survey.description}</p>
            <p className="text-gray-400 italic text-sm">
              survey created by someone
            </p>
          </div>

          <div className="flex flex-col mt-12 text-gray-500">
            {survey.questions.map((question, idx) => (
              <div key={question._id} className="my-8">
                <div className="flex flex-col">
                  <h3 className="text-gray-700 font-bold">
                    Q{idx + 1}. {question.title}
                  </h3>

                  <div className="ml-7">
                    {question.isField && (
                      <input
                        className="w-full px-2 py-1 border border-gray-400 outline-none mt-2 rounded bg-transparent"
                        type="text"
                        placeholder={question.fieldPlaceholder!}
                      />
                    )}

                    {question.isOption &&
                      question.options.map((option) => (
                        <div className="flex items-center" key={option._id}>
                          {option.name && (
                            <>
                              <input type="radio" />
                              <p className="text-sm font-semibold ml-2 my-1">
                                {option.name!}
                              </p>
                            </>
                          )}
                          {option.other && (
                            <input
                              type="text"
                              className="px-2 py-1 border border-gray-400 outline-none mt-2 rounded bg-transparent"
                              placeholder={option.other}
                              value=""
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-12">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Submit
              </button>

              <button className="px-4 py-2 ml-4 bg-gray-500 text-white rounded-lg">
                Clear Form
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(SurveyPage);
