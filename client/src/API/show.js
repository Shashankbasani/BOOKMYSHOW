const { axiosInstance } = require('./index.js');

export const getAllTheatersByMovies = async(payload)=>{
    try {
        console.log("am insdie the getSetters")
        const response = await axiosInstance.post('/api/shows/get-all-theater-by-movies', payload)
        return response.data;

    } catch (error) {
        console.log(error);
        //return error;
        
    }
}

export const getSingleShowDetals = async(showId)=>{
    try {
        const response = await axiosInstance.post('/api/shows/get-single-show-details', showId);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const addShow = async(values)=>{
    try {
        const res = await axiosInstance.post('/api/shows/add-show', values);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllShows = async()=>{
    try {
        const response = await axiosInstance.get('/api/shows/get-all-show-list');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const DeleteShows = async()=>{
    try {
        const res = await axiosInstance.delete('/api/shows/delete-all-shows');
        return res.data
    } catch (error) {
        console.log(error)
    }
}