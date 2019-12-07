import {useEffect, useState} from 'react';

const encodeGetParams = p =>
    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

export const API_URL = `/api/v1/`;
export const apiUrl = (path, query = {}) => `${API_URL}/${[path].flat().join('/')}?${encodeGetParams(query)}`;

export const fetchAuthToken =
    async ({
               time
           }) => {
        const res = await fetch(apiUrl(`getToken`, {time}), {method: "POST"});
        const data = await res.json();

        if(!data.success) throw data;

        return data.content;
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