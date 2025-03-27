import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { db } from "../firebaseConfig"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Get the user ID
            const userId = userCredential.user.uid;

            // Save user details to Firestore
            await setDoc(doc(db, "users", userId), {
                name: formData.name,
                email: formData.email,
                createdAt: new Date(),
            });

            console.log('User signed up and added to Firestore:', formData);

            // Redirect to the login page after successful sign-up
            navigate('/');
        } catch (error: any) {
            console.error("Error signing up:", error.message);
            alert("Error signing up: " + error.message);
        }
    };

    const handleBack = () => {
        navigate('/'); // Redirect to the main page
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#1c1c1c' }} // Dark gray outer background
        >
            <div
                className="card shadow-lg p-4"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    backgroundColor: '#333', // Gray inner box
                    color: '#ccc', // Light gray text
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Enhanced shadow
                }}
            >
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your name"
                            style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your email"
                            style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your password"
                            style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Confirm your password"
                            style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;