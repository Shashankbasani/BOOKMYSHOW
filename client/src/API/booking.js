const { axiosInstance } = require('./index.js');

export const makePayment = async(token, amount)=>{
    try {
        const response = await axiosInstance.post('/api/booking/make-payment',{token, amount});
        console.log(response)
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const bookShow = async(payload)=>{
    try {
        const res = await axiosInstance.post('/api/booking/book-show', payload);
        console.log(res.data);
        return res.data
    } catch (error) {
        return error.response
    }
}

export const getAllBookings = async()=>{
    try {
        const res = await axiosInstance.get('/api/booking/get-all-bookings');
        return res.data
    } catch (error) {
        return error.response
    }
}