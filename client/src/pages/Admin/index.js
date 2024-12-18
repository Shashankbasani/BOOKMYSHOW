import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheaterList from "./TheaterTable";
import ShowList from "./AddShow";


function Admin(){

    const items = [
        {
            key:"1",
            label:"Movies",
            children: <MovieList/>

        },
        {
            key:"2",
            label:"Theatres",
            children: <TheaterList/>

        },
        {
            key:"3",
            label:"show",
            children: <ShowList/>

        }
    ]

    return(
        <div>
           <h1>Admin Page</h1> 
           <Tabs defaultActiveKey="1" items={items}  />
        </div>
    )
}

export default Admin;