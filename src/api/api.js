const encodeGetParams = p =>
    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

//export const API_URL = process.env.API_URL;
export const API_URL = `/api/v1/`;
export const apiUrl = (path, query = {}) => `${API_URL}/${[path].flat().join('/')}?${encodeGetParams(query)}`;

export const fetchAuthToken =
    async ({
               userId
           }) => {
        const res = await fetch(apiUrl(`getToken`, {sessionId: userId}), {method: "POST"});
        const data = await res.json();

        if(!data.success) throw data;

        return data.content;
    };

export const authApprove = (sessionId) => new Promise((resolve, reject) => {
    if(!sessionId) return void resolve();
    const sse = new EventSource(apiUrl(`connectToApprove`, {sessionId}));
    sse.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        sse.close();
        if(data.success) resolve(data.content);
        else reject(data);
    });
});

export const mobileApprove =
    async ({
               token
           }) => {

        const res = await fetch(apiUrl(`mobile/approve`, {hash: token}));
        const data = await res.json();

        if(!data.success) throw data;

        return data.content;
    };

export const createUser =
    async () => {
        const res = await fetch(apiUrl(`createSession`), {method: "POST"});
        return await res.json();
    };