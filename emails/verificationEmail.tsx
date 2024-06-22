import React from 'react';

const VerificationEmail = (
    { email, otp }: { email: string, otp: string }
) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333' }}>
            <h2>Welcome to Our Website!</h2>
            <p>Dear User,</p>
            <p>Thank you for signing up with us. To complete your registration, please click the link below to verify your email address:</p>
            <p><a href={`http://yourwebsite.com/verify?email=${email}`} target="_blank" rel="noopener noreferrer">Verify Email Address</a></p>
            <p>If you did not sign up for our website, please disregard this email.</p>
            <p>Best Regards,<br />Your Website Team</p>
        </div>
    );
};

export default VerificationEmail;
