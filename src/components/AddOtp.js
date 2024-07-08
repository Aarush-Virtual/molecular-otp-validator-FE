import React, { useState } from 'react'

const AddOtp = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [username, setUsername] = useState('');

    const generateQrCodeURL = (username) => {
        fetch("http://localhost:8000/api/landingService/otp/generate" , {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({username})
        })
        .then(async (response) => {
            const data = await response.json();
            if(data.code===500) {
                alert(data.message.error || "Something went wrong, Please try again later");
            }
            console.log("data got from the api " , data);
            setQrCodeUrl(data.qrCodeUrl); 
        })
        .catch(error => {
            console.error("error in fetching the api " , error , error.message);
            if(error.message) {
                alert(error.message);
            }
        })
    }
    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };
    return (
        <div>
        <button onClick={() => setShowInput(true)}> Add Otp</button>
        {showInput && (
                <>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleInputChange}
                    />
                    <button onClick={() => generateQrCodeURL(username)}>Submit</button>
                </>
            )}
            {
                qrCodeUrl && 
                <img src={qrCodeUrl} alt = "otp qr code" />
                
            }
      </div>
    )
}

export default AddOtp