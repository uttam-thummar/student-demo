export function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.defaults.headers.common['X-CSCAPI-KEY'] = process.env.REACT_APP_API_KEY;
}