import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getSingleShowDetals } from "../../API/show";
import { bookShow, makePayment } from "../../API/booking";
import { Button, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout'
import { useSelector } from "react-redux";


function BookShow() {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const [searchparams] = useSearchParams();
  let date = searchparams.get('date')
  const [showSeats, setShowSeats] = useState([]);
  const [moviedata, setMoviedata] = useState();
  const [totalSeats, setTotalSeats] = useState(120); 
  const [isSelected, setIsSelected] = useState([]);
  const navigate = useNavigate();

  const seatsBooking = (seatNumber) => {
     if(isSelected.length === 10){
        message.error("User cant buy more then 10 Tickets")
     }else{
      if (isSelected.includes(seatNumber)) {
        setIsSelected(isSelected.filter((seat) => seat !== seatNumber));
      } else {
        setIsSelected([...isSelected, seatNumber]);
      }
    }
  };

  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    const isSeatBooked  = showSeats.includes(i)
    const isSeatSelected = isSelected.includes(i);
    seats.push(
      <div
        key={i}
        onClick={() => seatsBooking(i)}
        style={{
          width: "35px",
          height: "30px",
          margin: "2px",
          background: isSeatBooked ? "lightgray" : isSeatSelected ? "green" : "white",
          border: isSeatBooked?"1px solid gray":"1px solid green",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          borderRadius: "3px",
          transition: "background 0.3s ease", 
          cursor : isSeatBooked ? "not-allowed" : "pointer",
          pointerEvents: isSeatBooked ? "none" : "auto"
        }}
        onMouseEnter={(e) => {
          if (!isSeatBooked && !isSeatSelected) e.target.style.background = "#f1f1f1"; 
        }}
        onMouseLeave={(e) => {
          if (!isSeatBooked && !isSeatSelected) e.target.style.background = "white"; 
        }}
        
      >
        {i}
      </div>
    );
  }

  const singleShow = async () => {
    const showDetails = await getSingleShowDetals({ showId: id });
    setMoviedata(showDetails.data);
    setShowSeats(showDetails.data.bookedSeats)
    console.log(showDetails.data)
    if (showDetails) {
      setTotalSeats(showDetails.data.totalSeats || 120);
    }
  };

  const book = async(transactionID)=>{
    try {
      const response = await bookShow({show: id, transactionID,seats:isSelected, user:user._id});
      if(response.success){
        message.success("The show is Booked");
        navigate("/profile")
      }
    } catch (error) {
      message.error(error)
    }
  }

  const onToken = async(token)=>{
    try {
      console.log(token)
      const response =  await makePayment(token, isSelected.length * moviedata.ticketPrice);

      if(response.success){
        message.success(response.message);
        book(response.data);
      }else{
        message.error(response.message);
      }
    } catch (error) {
      message.error(error);
    }
  }

  useEffect(() => {
    singleShow();
  }, []);

  if (!moviedata) return null; 

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        height: "93vh",
        position: "relative",
        background: "#f9f9f9",
      }}
    >
      
      <Button
        type="primary"
        shape="round"
        icon={<LeftOutlined />}
        size="large"
        onClick={()=>{
          navigate(`/movie/${moviedata.movie._id}?date=${date}`)
        }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "linear-gradient(90deg, #4b79a1, #283e51)",
          borderColor: "#283e51",
          color: "white",
        }}
      >
        Go Back
      </Button>

      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        <p>{moviedata.movie.title}</p>
        <p style={{ fontSize: "13px", fontWeight: "400", marginTop:"-15px" }}>
          Theater: {moviedata.theater.name}
        </p>
      </div>

      {/* Screen Indicator */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "20px",
          backgroundColor: "#e6e6e6",
          textAlign: "center",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        SCREEN
      </div>

      {/* Seats Grid */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "2px",
          overflow: "hidden",
        }}
      >
        {seats}
      </div>

      {/* Selected Seats */}
      {isSelected.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "94px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          <p>
            {isSelected.length > 1
              ? `Selected Seats: ${isSelected.join(", ")}`
              : `Selected Seat: ${isSelected[0]}`}
          </p>
        </div>
      )}

      {/* Details Section */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          textAlign: "right",
          fontSize: "14px",
          fontWeight: "500",
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <p>
          Show Name: <strong>{moviedata.name}</strong>
        </p>
        <p>
          Date : <strong>{date}</strong> 
        </p>
        <p>
           Time: <strong>{moviedata.time}</strong> 
        </p>
        <p>
          Ticket Price: <strong>₹{moviedata.ticketPrice}</strong>
        </p>
        <p>
          Total Seats: <strong>{moviedata.totalSeats}</strong>
        </p>
        <p>
          Available Seats:{" "}
          <strong>{moviedata.totalSeats - isSelected.length}</strong>
        </p>
      </div>

      {/* Pay Button */}
      {isSelected.length > 0 && <StripeCheckout token={onToken} billingAddress amount={isSelected.length * moviedata.ticketPrice}
      stripeKey="pk_test_51QUC35FaIJO3t65NdWtXxgQbhpu0GWTT4Q1DuK0ZolCMj16yk0pjyZU8F2Uc12psO0UQYHR3VB6hnYuKMUjrYyNY004dMz7qea"
      > 
        <Button
          type="primary"
          style={{
            position: "absolute",
            width:"400px",
            bottom: "30px",
            right: "35.5%",
            background: "linear-gradient(90deg, #4CAF50, #087f23)",
            borderColor: "#087f23",
            color: "white",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          Pay Now ₹{isSelected.length * moviedata.ticketPrice}
        </Button>
      </StripeCheckout>}
    </div>
  );
}

export default BookShow;
























// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSingleShowDetals } from "../../API/show";
// import { LeftOutlined } from '@ant-design/icons';
// import { Button } from 'antd';


// function BookShow(){
//   const {id} = useParams();
//   const[moviedata, setMoviedata] = useState();
//   const[totalSeats, setTotalSeats] = useState(0);
//   const[bookedSeates, setBookedSeats] = useState([]);
//   const seats = [];
//   const [isSelected, setIsSelecetd] = useState([])
//    function seatsBooking(seatNumber){
//     if(isSelected.includes(seatNumber)){
//       setIsSelecetd(isSelected.filter((seat)=>seat !== seatNumber))
//     }else{
//       setIsSelecetd([...isSelected, seatNumber])
//     }
//    }

//   for (let i = 1; i <= totalSeats; i++) {
//     const isSeatSelected = isSelected.includes(i);
//     seats.push(
//       <div
//        onClick={()=>{seatsBooking(i)}}
//         key={i}
//         style={{
//           width: "43px",
//           height: "28px",
//           margin: "3px 2.5px",
//           background: isSeatSelected ? "green" : "white",
//           border:"1px solid green",
//           cursor:"pointer",
//           textAlign:"center",
//           fontWeight:"600"
          
//         }}
//       >
//         {i}
//       </div>
//     );
//   }

//     const singleShow = async()=>{
//       const showDetails = await getSingleShowDetals({showId:id});
//       console.log(showDetails.data);
//       setMoviedata(showDetails.data);
//       if(showDetails){
//         setTotalSeats(showDetails.data.totalSeats);
//         setBookedSeats(showDetails.data.bookedSeats)
//       }
//     }

//     useEffect(()=>{
//     singleShow();
//     },[])
//   if(moviedata){
//   return (
//     <div>
//        <Button
//       type="primary"
//       shape="round"
//       icon={<LeftOutlined />}
//       size="large"
      
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(90deg, #4b79a1, #283e51)', // Gradient background
//         borderColor: '#283e51',
//         color: 'white',
//         fontWeight: 'bold',
//         padding: '0 20px',
//       }}
//       hoverable="true"
//     >
//       Go Back
//     </Button>
//       <div style={{position:"absolute", width:"300px", height:"120px",top:"20px",left:"20px",textAlign:"center"}}>
//          <p style={{position:"absolute",top:"-27px",left:"30px",fontSize:"27px", fontWeight:"700"}}>{moviedata.movie.title}</p>
//          <span style={{marginTop:"-10px",position:"absolute",top:"50px",left:"30px",fontSize:"12px",fontWeight:"600"}}>Theater: {moviedata.theater.name}</span>
//       </div>
//      <div style={{position:"absolute",width:(totalSeats * 5)+"px",height:"15px",borderRadius:"8px",background:"#e6e6e6",top:"17%",left:"24%",
//       textAlign:"center",fontWeight:"600",fontSize:"10px"
//      }}>
//       SCREEN
//      </div>
//       <div
//       style={{position:"absolute",width:(totalSeats * 5)+"px",height:(totalSeats * 3)+"px",
//         display:"flex", flexWrap:"wrap",top:"20%",left:"24%"}}
//       >
//          <div style={{ display: "flex", flexWrap: "wrap"}}>{seats}</div>
//       </div>
//       <div style={{position:"absolute",
//                    right:"60px",
//                    top:"30px",
//                    width:"300px",
//                    height:"200px",
//                    fontFamily:"inherit",
//                    fontSize:"14px"
//                   }}>
//         <p>show name : <span style={{fontWeight:"500"}}>{moviedata.name}</span></p>
//         <p style={{marginTop:"-10px"}}>Date & Time: <span style={{fontWeight:"500"}}>{moviedata.time}</span></p>
//         <p style={{marginTop:"-10px"}}>Ticket Price: <span style={{fontWeight:"500"}}>RS/- {moviedata.ticketPrice}</span></p>
//         <p style={{marginTop:"-10px"}}>Total seats: <span style={{fontWeight:"500"}}>{moviedata.totalSeats}</span></p>
//         <p style={{marginTop:"-10px"}}>Avaliable seats: <span style={{fontWeight:"500"}}>{moviedata.totalSeats - isSelected.length}</span></p>

//       </div>
//      {isSelected.length !==0 && <div style={{position:"absolute", bottom:"40px",left:"200px",fontFamily:"sans-serif",fontWeight:"500",width:"700px",height:"20px",border:"1px solid gray",padding:"20px"}}>
//                       {isSelected.length !== 1 ? (<span style={{fontWeight:"700"}}>SELECTED SEATS : {isSelected.map((s,i)=>i==0?s:", "+s)}</span> ): (<span style={{fontWeight:"700"}}>SELECTED SEAT : {isSelected.map(s=>s)}</span>)
//                         }
//       </div>
      
//       }
//     </div>
//   )}
// }

// export default BookShow;

