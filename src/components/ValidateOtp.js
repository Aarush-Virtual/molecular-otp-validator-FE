import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ValidateOtp = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = (username, code) => {
        fetch("http://localhost:8000/api/landingService/otp/validate", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, code })
        })
        .then(async (response) => {
            const data = await response.json();
            console.log("Data received from the API:", data);
            // setQrCodeUrl(data.qrCodeUrl);
            if(data) {
                toast("User verified successfully");
            }else{
                toast.error("User not verified, invalid otp")
            }
        })
        .catch(error => {
            console.error("Error fetching the API:", error, error.message);
        });
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    return (
        <div>
            <button onClick={() => setShowInput(true)}>Login</button>
            {showInput && (
                <>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <input
                        type="text"
                        placeholder="Enter your code"
                        value={code}
                        onChange={handleCodeChange}
                    />
                    <button onClick={() => handleSubmit(username, code)}>Submit</button>
                </>
            )}
            {/* {qrCodeUrl &&
                <img src={qrCodeUrl} alt="OTP QR Code" />
            } */}
        </div>
    );
};

export default ValidateOtp;