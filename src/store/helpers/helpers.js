import {produce} from 'immer';

export const fetchStore = (name, set, fn, init = null) => {
    const nameGen = (...args) => `${name}::${args.join('::')}`;

    return {
        [name]:
            {
                data: init,
                loading: false,
                error: null,

                fetch: async (...args) => {
                    set(
                        state => produce(state, state => {
                            state[name].loading = true;
                            state[name].error = null;
                        }),
                        nameGen('fetchStart')
                    );

                    try{
                        const data = await fn(...args);
                        set(
                            state => produce(state, state => {
                                state[name].data = data;
                                state[name].error = null;
                            }),
                            nameGen('fetchData')
                        );
                    }
                    catch(error){
                        set(
                            state => produce(state, state => {
                                state[name].data = init;
                                state[name].error = error;
                            }),
                            nameGen('fetchError')
                        );
                    }finally{
                        set(
                            state => produce(state, state => void (state[name].loading = false)),
                            nameGen('fetchEnd')
                        );
                    }
                }
            }
    };
};