import Cookie from 'js-cookie';

export const setToken = (token: string, reset: boolean = false) => {
  if (reset) {
    Cookie.remove('__survey_dump_auth_token__');
  } else {
    Cookie.set('__survey_dump_auth_token__', token, {
      expires: 60 * 60 * 24 * 2, // 2 days
    });
  }
};
