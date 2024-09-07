import {create} from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  StateStorage,
} from 'zustand/middleware';

import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

interface BearState {
  counter: number;
  userData: {
    auth_token: string;
  };
  increase: (by: number) => void;
  setData: (key: any, data: any) => void;
  setUserData: (data: {auth_token: string}) => void;
}

const useStore = create<BearState>()(
  devtools(
    persist(
      set => ({
        counter: 0,
        saved: [],
        increase: by => set(state => ({counter: state.counter + by})),
        userData: {
          auth_token: '',
        },
        setUserData: data => set({userData: data}),
        setData: (key, data) => set({[`${key}`]: data}),
      }),
      {
        name: 'bear-storage',
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);

export default useStore;
