const encodeGetParams = p =>
    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

//export const API_URL = process.env.API_URL;
export const API_URL = `/api/v1/`;
export const apiUrl = (path, query = {}) => `${API_URL}/${[path].flat().join('/')}?${encodeGetParams(query)}`;

export const fetchAuthToken =
    async ({
               userId
           }) => {
        const res = await fetch(apiUrl(`getToken`, {userId}), {method: "POST"});
        const data = await res.json();

        if(!data.success) throw data;

        return data.content;
    };

export const authApprove = (userId) => new Promise((resolve, reject) => {
    if(!userId) return void resolve();
    const sse = new EventSource(API_URL + `connectToApprove?userId=${userId}`);
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
    async ({
               firstName = "Boris",
               lastName = "Eltsyn"
           } = {}) => {


        const res = await fetch(apiUrl(`createUser`, {firstName, lastName}), {method: "POST"});
        const data = await res.json();

        return data;
    };