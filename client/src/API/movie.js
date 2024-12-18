const { axiosInstance } = require('./index.js');

export const GetMovies = async()=>{
    try {
 
        const response = await axiosInstance.get('api/movies/get-all-movies')
        return response.data;

    } catch (error) {
        console.log(error);
        //return error;
        
    }
}

export const addMovie = async(values)=>{
    try {

        const response = await axiosInstance.post('api/movies/add-movie', values)
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const getOneMove = async(movieId)=>{
    try {

        const response = await axiosInstance.get(`/api/movies/movie/${movieId}`)
        return response.data;

    } catch (error) {
        console.log(error)
    }
}