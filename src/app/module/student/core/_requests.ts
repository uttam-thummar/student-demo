import axios, { AxiosResponse } from 'axios';

const API_URL = "https://api.countrystatecity.in/v1";

const getCountries = () => {
    return axios
        .get(`${API_URL}/countries`)
        .then((d: AxiosResponse) => d.data)
}
const getStatesByCountries = (iso2: string) => {
    return axios
        .get(`${API_URL}/countries/${iso2}/states`)
        .then((d: AxiosResponse) => d.data)
}
const getCitiesByStateAndCountry = (ciso: string, siso: string) => {
    return axios
        .get(`${API_URL}/countries/${ciso}/states/${siso}/cities`)
        .then((d: AxiosResponse) => d.data)
}

export { getCountries, getStatesByCountries, getCitiesByStateAndCountry }