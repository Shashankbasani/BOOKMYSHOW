import {useNavigate, UseNavigation} from 'react-router-dom';
import moment from 'moment'
import {Row, Col, Input, message} from 'antd'
import { useState, useEffect } from 'react';
import { GetMovies } from '../API/movie';

function HomePage(){
    const navigate = useNavigate();
    const [movies, setMovies] = useState(null);

    const getData= async()=>{
        try {
            //dispatch(showLoading());
            const res = await GetMovies();
            if(res.success){
                setMovies(res.data)
            }else{
                message.error(res.message)
            }
           // dispatch(hideLoading())
        } catch (error) {
            message.error(error);
           // dispatch(hideLoading())
        }
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <div>
            
           <h1>Movies</h1> 
            <Row
            className='justify-content-center'
            gutter={{
                xs:6,
                sm:10,
                md:12,
                lg:16
            }}
            >
                {movies && movies.map((movie)=>{
                   return (
                     <Col
                    className='gutter-row mb-5'
                    key={movie.id}
                    span={{
                        xs:24,
                        sm:24,
                        md:12,
                        lg:10
                    }}
                    >
                        <div className='text-center'>
                            <img
                            className='cursor-pointer'
                            src={movie.poster}
                            alt='Movie poster'
                            width={"200"}
                            height={"200"}
                            style={{borderRadius:"8px", objectFit:"cover"}}
                            onClick={()=>{
                                navigate(`/movie/${movie._id}?=${moment().format('YYYY-MM-DD')}`)
                            }}
                            />
                                <h3 className='cursor-pointer'>
                                    {movie.title}
                                </h3>
                        </div>
                    </Col>
                   )
                })}
            </Row>
        </div>
    )
}

export default HomePage;