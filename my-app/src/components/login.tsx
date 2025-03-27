import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase auth

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Sign in the user with Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);
            console.log(`Logged in with email: ${email}`);
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (err: any) {
            console.error("Login error:", err.message);
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleSignUp = () => {
        navigate('/signup'); // Redirect to the sign-up page
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#1c1c1c' }} // Light black background
        >
            <div
                className="card shadow-lg p-4"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    backgroundColor: '#333', // Gray box
                    color: '#ccc', // Gray text
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Enhanced shadow
                }}
            >
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={handleSignUp}
                            className="btn btn-secondary"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;