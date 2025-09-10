import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../Firebase/firebase.config";

const Phone = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    // Setup invisible Recaptcha
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response) => {
                console.log("Recaptcha verified");
            },
        });
    };

    // Send OTP
    const sendOtp = async () => {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        try {
            const result = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(result);
            alert("OTP sent!");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        if (!confirmationResult) return;

        try {
            const result = await confirmationResult.confirm(otp);
            alert("Phone verified! User logged in: " + result.user.phoneNumber);
        } catch (error) {
            console.error(error);
            alert("Invalid OTP");
        }
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-10">
            <h2>Phone Authentication</h2>
            <input
                type="text"
                placeholder="Enter phone number (+8801XXXXXXXXX)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>

            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>

            {/* Required Recaptcha container */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default Phone;
