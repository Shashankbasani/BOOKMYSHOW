import { useSelector } from "react-redux";
import { Button, Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/loadSlicer";
import { getAllBookings } from "../../API/booking";
import { useDispatch } from "react-redux";
import moment from 'moment';
import { Link } from "react-router-dom";

function Profile() {
    const user = useSelector((state) => state.user.user);
    const [booking, setBooking] = useState([]);
    const dispatch = useDispatch()


    const getData = async()=>{
        try {
            dispatch(showLoading())
            const response = await getAllBookings();
            if(response.success){
                setBooking(response.data);
                console.log(response.data);
            }
            dispatch(hideLoading())
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    if (!user) {
        return <div>Loading...</div>; 
    }
    else if(!booking.length){
        return  (  <div className="text-center pt-3">
            <h1>hey {user.name} You've not booked any show yet!</h1>
            <Link to="/"><Button type="primary">Start Booking</Button></Link>
        </div>)
    }

    return(
        <>
            {booking && <Row gutter={24}>
                { booking.map(booking => {
                    return <Col key={booking._id} xs={{span: 24}} lg={{span: 12}}>
                    <Card className="mb-3">
                        <div className="d-flex flex-column-mob">                
                            <div className="flex-shrink-0"><img src={booking.show.movie.poster} width={100} alt="Movie Poster"/></div>
                            <div className="show-details flex-1">
                                <h3 className="mt-0 mb-0">{booking.show.movie.title}</h3>
                                <p>Theatre: <b>{booking.show.theater.name}</b></p>
                                <p>Seats: <b>{booking.seats.join(", ")}</b></p>
                                <p>Date & Time: <b>{moment(booking.show.date).format("MMM Do YYYY")} {moment(booking.show.time, "HH:mm").format("hh:mm A")}</b>  </p>
                                <p>Amount: <b>Rs.{booking.show.bookedSeats.length * booking.show.ticketPrice}/- </b></p>
                                <p>Booking ID: <b>{booking._id} </b></p>
                            </div>
                        </div>
                    </Card>                
                </Col>
                }) }    
                
            </Row>}

         
            
        </>
    )
}

export default Profile;
