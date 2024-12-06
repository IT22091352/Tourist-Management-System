import React, { useState, useEffect } from "react";
import "../../cssFIle//Display.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Displaytourist() {
    const navigate = useNavigate();
    const [tourists, setTourists] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const getTourists = () => {
        axios.get("http://localhost:5000/tourist/dis").then((res) => {
            setTourists(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    };

    useEffect(() => {
        getTourists();
    }, []);

    const onDelete = (id) => {
        axios.delete(`http://localhost:5000/tourist/delete/${id}`)
            .then((res) => {
                alert("Insurance Profile Delete Successful");
                setTourists(tourists.filter(tourist => tourist._id !== id));
            })
            .catch((err) => {
                console.error("Error deleting:", err);
            });
    };
    
   


    return (
        <div className="discontainer">
           <div className="menu-container">
    <button type="button" className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        Menu
    </button>
    {showMenu && (
        <ul className="menu-dropdown">
            <li><button onClick={() => navigate("/cal")}>Insurance Payment</button></li>
            <li><button onClick={() => navigate("/pricing")}>Insurance Details</button></li>
        </ul>
    )}
</div>

            <h1>Tourist Insurance Profile</h1> <br /><br />
            <div>
               
                {tourists.map((tourist, index) => (
                    <div key={index} className="tourist-profile">
                        
                        <p>Name: {tourist.name}</p>
                        <p>Age: {tourist.age}</p>
                        <p>Country: {tourist.country}</p>
                        <p>Gender: {tourist.gender}</p>
                        <p>Insurance Package: {tourist.ipackage}</p>
                        <p>Period: {tourist.period}</p>
                        <p>Destination: {tourist.destination}</p>
                        <p>Trip Start Date: {new Date(tourist.tripStartDate).toLocaleDateString()}</p>
                        <p>Trip End Date: {new Date(tourist.tripEndDate).toLocaleDateString()}</p>
                        <button className="btn btn-warning"
                         onClick={() => navigate(`/update/${tourist._id}`)}>Update</button>
                         <br/><br/>
                        <button className="btn btn-danger"
                            onClick={() => onDelete(tourist._id)}>Delete</button>
                            
                            <br /><br />
                            
                    </div>
                    
                ))}
               
            </div>
        </div>
    );
}
