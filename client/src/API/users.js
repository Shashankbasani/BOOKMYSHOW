const { axiosInstance } = require('./index.js');

export const LoginUser = async(values)=>{
    try {

        const response = await axiosInstance.post('/api/users/login', values)
        console.log(response)
        return response.data;

    } catch (error) {
        console.log(error)
    }
}


export const RegisterUser = async(values)=>{
    try {

        const response = await axiosInstance.post('/api/users/register', values)
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const CurrentUsers = async()=>{
    try {
 
        const response = await axiosInstance.get('/api/users/get-current-user')
        return response.data;

    } catch (error) {
        console.log("error.response.data");
        console.log(error.response.data);
        return error.response.data;
        
    }
}