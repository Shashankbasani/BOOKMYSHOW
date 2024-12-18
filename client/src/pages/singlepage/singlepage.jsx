import { getOneMove } from "../../API/movie";
import {useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";
import {message } from "antd";
import moment from "moment"
import { Input } from "antd";
import { CalendarOutlined } from '@ant-design/icons';
import { getAllTheatersByMovies } from "../../API/show";



function Singlepage(){
    const navigate = useNavigate();
 const  {id} = useParams();
 const [searchparams] = useSearchParams();
 let dd = searchparams.get('date');
 const [date, setDate]= useState(moment().format("YYYY-MM-DD"));
 const [theaters, setTheaters] = useState([])
 const [movie, setMovie] = useState([]);
 const [isHovered, setIsHovered] = useState(false);

 const handleDate=(e)=>{
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    console.log(date)
    navigate(`/movie/${id}?date=${e.target.value}`)
 }

 const getData= async()=>{
     try {
         //dispatch(showLoading());
         const res = await getOneMove(id);
         if(res){
             setMovie(res.data)
             console.log(movie)
             console.log("IYST")
             console.log(res)
         }
        // dispatch(hideLoading())
     } catch (error) {
         message.error(error);
        // dispatch(hideLoading())
     }
 }

 const getalltheaters = async()=>{
    try {
 
        const res = await getAllTheatersByMovies({
            movie: id,
            date: date + "T00:00:00.000+00:00",
          });
        if(res.data){
            console.log(res.data);
            setTheaters(res.data);
        }
    } catch (error) {
        message.error(error)
    }
 }

        useEffect(()=>{
            getData();
            getalltheaters();
        },[date])


    return(
        <div className="inner-container">
            {movie && (
                <div className="d-flex single-movie-div">
                    <div className="flex-shrink-0 me-3 single-movie-img">
                        <img src={movie.poster} width={150} alt="Movie Poster" />
                    </div>
                    <div className="w-100">
                    <h1 className="nt-8">{movie.title}</h1>
                        <p className="movie-data">
                        Language: <span>{movie.language && movie.language}</span>
                         </p>
                        <p className="movie-data">
                        Genre: <span>{movie.genere}</span>
                        </p>
                        <p className="movie-data">
                        Release Date: {" "}
                        <span>{moment(movie.date).format("MM Do YYYY")}</span>
                        </p>
                        <p className="movie-data">
                        Duration: <span>{movie.duration} Minutes</span>
                        </p>
                        <hr />

                        <div className="d-flex flex-column-mob align-items-center mt-3">
                            <label htmlFor="" className="me-3 flex-shrink-0">Choose the date</label>
                            <Input 
                           onChange={handleDate}
                           type="date"
                           className="max-width-300 mt-8px-mob"
                           value={date}
                           placeholder="default size"
                           prefix ={<CalendarOutlined/>}
                            >
                            </Input>
                        </div>
                    </div>
                </div>
            )}
             {
                theaters.length !== 0 && 
                
                <div >
                <h1>
                 Theaters
                </h1>
                {theaters.map(film=>{
                    return (
                        <div style={{position:"relative", width:"100%", height:"100px"}}>
                          <div style={{position:"absolute", left:"50px", top:"10px", width:"100px"}}>
                                 <h2>{film.name}</h2>
                          </div>
                          <div style={{position:"absolute", left:"250px", top:"30px", display:"flex", flexWrap:"wrap"}}>
                            {film.shows.map(show=>{
                                return(
                                   <div 
                                        style={{
                                            position: "relative",
                                            width: "100px",
                                            height: "40px",
                                            border: "1px solid orange",
                                            margin: "0 20px",
                                            paddingTop: "10px",
                                            textAlign: "center",
                                            color:  "orange",
                                            // backgroundColor: isHovered ? "orange" : "transparent",
                                            cursor: "pointer",
                                        }}
                                       onClick={()=>{
                                                navigate(`/bookshow/${show._id}?date=${date}`)
                                                }}
                                   >
                                      {show.time}
                                      {console.log(show)}
                                   </div>
                                   
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
             </div>
             }
           
            
        </div>
    )
}

export default Singlepage;


