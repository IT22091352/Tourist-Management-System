
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../cssFIle//Manager.css"; 
import axios from "axios";

export default function InsuranceManager() {
    const navigate = useNavigate();
    const [tourists, setTourists] = useState([]);

    const getTourists = () => {
        axios.get("http://localhost:5000/tourist/dis")
            .then((res) => {
                setTourists(res.data);
            })
            .catch((err) => {
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

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        const filteredUsers = tourists.filter((user) =>
            Object.values(user).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setTourists(filteredUsers);
        setNoResults(filteredUsers.length === 0);
    };

    

    return (
        <div className="m-4 p-4">
            <h1 className="topic">Tourist Insurance Details</h1>
            
            <div className="search-container">
            <input onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                style={{width:'400px'}}
                placeholder="Search tourists Details"></input>
            <button onClick={handleSearch}>Search</button> 
            </div>

            
         
            {noResults ? (
                <div>
                    <p>No Users Found</p>
                </div>
            ) : null}

           
            <table className="table">
                <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Age</th>
                        <th>Country</th>
                        <th>Gender</th>
                        <th>Insurance Package</th>
                        <th>Period</th>
                        <th>Destination</th>
                        <th>Trip Start Date</th>
                        <th>Trip End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tourists.map((tourist, index) => (
                        <tr key={index}>
                            <td>{tourist.name}</td>
                            <td>{tourist.age}</td>
                            <td>{tourist.country}</td>
                            <td>{tourist.gender}</td>
                            <td>{tourist.ipackage}</td>
                            <td>{tourist.period}</td>
                            <td>{tourist.destination}</td>
                            <td>{new Date(tourist.tripStartDate).toLocaleDateString()}</td>
                            <td>{new Date(tourist.tripEndDate).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn1" onClick={() => navigate(`/update/${tourist._id}`)}>Update</button>
                                <button className="btn btn2" onClick={() => onDelete(tourist._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

