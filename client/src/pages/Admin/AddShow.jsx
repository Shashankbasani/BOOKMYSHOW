import { useEffect, useState } from "react";
import { Table, Button, Tag } from "antd";
import { getAllShows } from "../../API/show";
import { GetMovies } from "../../API/movie";
import ShowForm from "./AddShowForm";
import { GetAllTheaters } from "../../API/theater";
import { DeleteShows } from "../../API/show";

function ShowList() {
  const [show, setShow] = useState([]); 
  const [movies, setMovie] = useState([]);
  const [theaters, setTheater] = useState([]);
  const [ismodel, setIsmodel] = useState(false); 

  async function getData() {
    const response = await getAllShows();
    const allShows = response.data;

    setShow(
        allShows.map((i) => ({
        ...JSON.parse(JSON.stringify(i)),
        key: i._id, 
      }))
    );

    const allMovies = await GetMovies();
    if(allMovies){
        setMovie(allMovies.data)
    }

    const alltheaters = await GetAllTheaters();
    if(alltheaters){
        setTheater(alltheaters.data)
    }

  }

  useEffect(() => {
    getData();
  }, []);

  const TableHeading = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => {
        return new Date(date).toISOString().split("T")[0];
      },
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie ID",
      dataIndex: "movie",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      render: (price) => `₹${price}`,
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Booked Seats",
      dataIndex: "bookedSeats",
      render: (seats) => seats.length, 
    },
    {
      title: "Theater ID",
      dataIndex: "theater",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              console.log("Edit Show:", record._id);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              console.log("Delete Show:", record._id);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsmodel(true);
        }}
        style={{ marginBottom: "16px" }}
      >
        Add a Show
      </Button>

      <Button
        type="primary"
        onClick={async() => {
         const success = await DeleteShows();
         if(success.success){
            getData() 
         }
        }}
        style={{ marginBottom: "16px", position:"absolute", right:"10px" }}
      >
        Delete All Shows
      </Button>

      {ismodel && (
        <ShowForm
          ismodel={ismodel}
          setIsmodel={setIsmodel}
          setShow={setShow}
          movies ={movies}
          theaters ={theaters}
        />
      )}

      <Table columns={TableHeading} dataSource={show} />
    </div>
  );
}

export default ShowList;
