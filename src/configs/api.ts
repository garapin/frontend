import axios from 'axios';

let token: any = null

if (typeof window !== 'undefined') {
   token = localStorage.getItem('token')
}

const host = axios.create({
    baseURL: 'https://asia-southeast2-garapin-f35ef.cloudfunctions.net/',
    headers: {
        'Authorization': 'Bearer ' + JSON.parse(token),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
})

const api = {
    getShipping: (data: any) => host.post('webShipping/pricing', data),
    paymentApi: (data: any) => host.post('webCheckout', data)
}

export default api;