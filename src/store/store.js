import create from 'zustand';
import {devtools} from 'zustand/middleware';
import produce from 'immer';
import {createUser, fetchAuthToken} from '../api/api';
import {fetchStore} from './helpers/helpers';

const store = (set) => ({
    set: fn => set(produce(fn), "set"),

    libquietLoading: true,
    libquietProfile: "ultrasonic-experimental",

    approveCode: null,

    ...fetchStore("user", set, createUser, null),
    ...fetchStore("authToken", set, fetchAuthToken, null),
});

export const [useStore, storeApi] = create(devtools(store, "techmadnessStore"));