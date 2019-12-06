import {useEffect, useState} from 'react';

export const fetchAuthToken =
    async ({
               time
           }) => {
        const res = await fetch(
            `http://185.251.38.131:8080/rest/api/getHashByTime?time=${time}`
        );
        return await res.text();
    };

export const useFetchAuthToken =
    (props, deps = []) => {

        const [data, setData] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            void (async () => {
                setLoading(true);
                try{
                    setData(await fetchAuthToken(props));
                }
                catch(error){
                    setError(error);
                }
                finally{
                    setLoading(false);
                }
            })();
        }, deps);

        return [data, loading, error];

    };