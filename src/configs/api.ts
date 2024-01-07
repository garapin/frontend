import { OrderRequest } from '@/types/admin';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const host = axios.create({
    baseURL: 'https://asia-southeast2-garapin-f35ef.cloudfunctions.net/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
})

host.interceptors.request.use(async (req) => {
    const token = await  getAuth().currentUser?.getIdToken()

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    } else {
        // if on window/browser, redirect to login
        if (window && window.location.pathname !== '/login') {
            window.location.href = '/login'
        }
    }
    return req
})

const api = {
    getShipping: (data: any) => host.post('webShipping/pricing', data),
    paymentApi: (data: any) => host.post('webCheckout', data),
    postCalculateTemplatePrice: (data: any) => host.post('calculate/templatePricing', data),
    processOrder: (data: OrderRequest) => host.post('webAdmin/orders/process', data),
    shipOrder: (data: any) => host.post('webAdmin/orders/ship', data),
}

export default api;