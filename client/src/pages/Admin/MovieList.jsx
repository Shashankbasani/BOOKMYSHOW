import { useEffect, useState } from "react";
import { Table, Button } from "antd";
//const  GetMovies  =  require("../../API/movie,js");
import { GetMovies } from "../../API/movie.js";
import MovieForm from "./MovieForm.jsx";

function MovieList(){
   const[movies, setMovies] = useState([]);
   const [ismodel, setIsmodel] = useState(false);

    async function getData() {
        const response = await GetMovies();
        const allMovies = response.data;
        setMovies(
            allMovies.map(i=>{
                return ({...JSON.parse(JSON.stringify(i)), key : i._id})
            })
        )
        /**
        
        const SB = {
            id: 123,
            name: "Sample",
            nested: {
                value: 42
            }
        };

        For a deep copy, the nested objects would be copied as well, and changes in bs won't affect SB:javascriptCopy code      
         const bs = { ...JSON.parse(JSON.stringify(SB)), key: SB.id };
         This ensures that the nested object SB.nested is copied, and the changes to bs.nested won't impact SB.nested.
          
          {
            id: 123,
            name: "Sample",
            nested: {
                value: 42
            },
            key: 123
         }

         */
    }

    useEffect(()=>{
        getData();
    },[])

    const TableHeading = [
        {
            title:"Poster",
            dataIndex:"poster",
            render:(text, data)=>{
                return (<img src={data.poster} width={75} height={115}/>)
            }
        },
        {
            title:"Movie Name",
            dataIndex:"title",
        },
        {
            title:"Description",
            dataIndex:"description",
        },
        {
            title:"Duration",
            dataIndex:"duration",
        },
        {
            title:"Genere",
            dataIndex:"genere",
        },
        {
            title:"Release Date",
            dataIndex:"releaseDate",
        },
        
    ]

    return(
        <div>
            <Button 
            type="primary"
            onClick={()=>{
                setIsmodel(true);
            }}
            >
                Add a Movie
            </Button>
            {
            ismodel && 
            <MovieForm
             ismodel={ismodel}
             setIsmodel={setIsmodel}
             setMovies={setMovies}
             
            />}

           <Table columns={TableHeading} dataSource={movies}/>
        </div>
    )
}

export default MovieList;