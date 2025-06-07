import axios from "axios";

export const Api = axios.create({
    baseURL: 'http://44.208.165.188:1000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const AxiosToastError = (err, toastRef) => {
    toastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: err || 'Ocurrió un error',
        life: 3000,
    });
};

