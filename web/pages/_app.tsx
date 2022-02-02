import '../styles/globals.css';
import 'nprogress/nprogress.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-notifications';
import NProgress from 'nprogress';
import Router from 'next/router';
import {
  useCreateSurveyStore,
  SurveyStoreProvider,
} from '../lib/stores/survey.store';
import {
  useCreateUserStore,
  UserStoreProvider,
} from '../lib/stores/users.store';

NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  const createSurveyStore = useCreateSurveyStore(pageProps.initialSurveyState);
  const createUserStore = useCreateUserStore(pageProps.initialUserState);
  return (
    <>
      <UserStoreProvider createStore={createUserStore}>
        <SurveyStoreProvider createStore={createSurveyStore}>
          <ToastProvider placement="top-right">
            <div className="min-h-screen h-full">
              <Component {...pageProps} />
            </div>
          </ToastProvider>
        </SurveyStoreProvider>
      </UserStoreProvider>
    </>
  );
}

export default MyApp;
