import React, { useState, useEffect, useRef} from "react";
import "../../cssFIle//Calculation.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function Calculation() {
    const navigate = useNavigate();
    const [tourists, setTourists] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [issuedDate, setIssuedDate] = useState(new Date().toLocaleDateString());

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

    const getFinalClaimFee = (tourist) => {
        let basic = 0;
        let policy = 0;
        let dis = 0;

        switch (tourist.ipackage) {
            case "SILVER Travel Insurance Package":
                basic = 1875.38;
                break;
            case "PLATINUM Travel Insurance Package":
                basic = 1375.96;
                break;
            case "GOLD Travel Insurance Package":
                basic = 2314.96;
                break;
            default:
                break;
        }

        policy = 500.00;
        dis = 0.00;

        const total = ((basic * parseFloat(tourist.period)) + policy) - dis;

        return {
            basic,
            policy,
            dis,
            total
        };
    };

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle:"Insurance Payment Report",
        onAfterPrint:() => alert("Insurance Report Successfully Download!")
    });

    return (
        <div className="discontainer">
            <div className="menu-container">
                <button className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
                    Menu
                </button>
                {showMenu && (
                    <ul className="menu-dropdown">
                        {/* <li><button onClick={() => navigate("/cal")}>Insurance Payment</button></li> */}
                        <li><button onClick={() => navigate("/pricing")}>Insurance Details</button></li>
                    </ul>
                )}
            </div>
            <div ref={ComponentsRef}> 
                <h1 className="report-head">Insurance Payment Report</h1>
                
                <br />
                <div>
                    {tourists.map((tourist, index) => (
                        <div key={index} className="tourist-profile">
                          <p className="date">Date: {issuedDate}</p>
                            <p>Name: {tourist.name}</p><br/>
                            <p>Insurance Package: {tourist.ipackage}</p><br/>
                            <p>Period: {tourist.period}</p><br/>
                            <p>Basic Premium: {getFinalClaimFee(tourist).basic}</p><br/>
                            <p>Policy Fee: {getFinalClaimFee(tourist).policy}</p><br/>
                            <p>Discount: {getFinalClaimFee(tourist).dis}</p><br/>
                            <p>Total Insurance Payment: {getFinalClaimFee(tourist).total}</p><br/>
                           
                            <br /><br />
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn-warning1" onClick={() => navigate(`/dis`)}>Back</button><br/><br/>
           <button className="btn-warning1" onClick={handlePrint}>Download Report</button>
        </div>
    );
}
