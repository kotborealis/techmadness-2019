import create from 'zustand';
import {devtools} from 'zustand/middleware';
import produce from 'immer';

const store = (set) => ({
    set: fn => set(produce(fn), "set"),

    libquietLoading: true,
});

export const [useStore, storeApi] = create(devtools(store, "techmadnessStore"));