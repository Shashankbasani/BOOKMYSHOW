const { axiosInstance } = require('./index.js');

export const GetAllTheaters = async()=>{
    try {
 
        const response = await axiosInstance.get('api/theaters//get-all-theaters')
        return response.data;

    } catch (error) {
        console.log(error);
        //return error;
        
    }
}



export const addTheater = async(values)=>{
    try {
        const res = await axiosInstance.post('api/theaters/add-theatre',values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

