import { useLayoutEffect } from 'react';
import create, { StoreApi, UseBoundStore } from 'zustand';
import createZustandContext from 'zustand/context';

export type UserType = {
  email: string;
  image: string;
  name: string;
};

interface IUsersStore {
  authUser: UserType | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: UserType) => void;
}

type InitialStateType = Pick<IUsersStore, 'authUser' | 'isAuthenticated'>;
type UserStoreType = (
  preloadedState?: InitialStateType | {}
) => UseBoundStore<IUsersStore, StoreApi<IUsersStore>>;

const initialState: InitialStateType = {
  authUser: null,
  isAuthenticated: false,
};

let store: ReturnType<UserStoreType> | undefined;

const zustandContext = createZustandContext<IUsersStore>();
export const useUserStore = zustandContext.useStore;
export const UserStoreProvider = zustandContext.Provider;

export const initializeStore: UserStoreType = (
  preloadedState: InitialStateType | {} = {}
) =>
  create<IUsersStore>((set) => ({
    ...initialState,
    ...preloadedState,
    logout: () => {
      set({
        authUser: null,
        isAuthenticated: false,
      });
    },
    setUser: (user) => {
      set({
        authUser: user,
        isAuthenticated: true,
      });
    },
  }));

export function useCreateUserStore(initialState: InitialStateType) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);

  console.log(store);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}
