import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./reset.css"; // Importing CSS file

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");

    const handleInputChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/reset-password", {
                token,
                password,
            });
            if (response.data.success) {
                alert("Password reset successful!");
                window.location.href = "/log";
            } else {
                alert("Password reset failed. Please try again.");
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="reset">
            <div className="reset-form">
                <form onSubmit={handleSubmit}>
                    <h1 className="reset_title">Reset Password</h1>
                    <input
                        className="reset_input"
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="Enter your new password"
                        required
                    />
                    <button type="submit" className="reset_button ">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;